import './App.css';
import {useState} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

function Header(props){
  // const myStyle = {
  //   borderBottom: "1px solid gray",
  //   padding: '10px',
  //   fontSize: '20px',
  // }
  return <header className={props.className}><h1><Link to="/" onClick={(evt) => {
    console.log('evt', evt);
    props.onSelect();
  }}>WWW</Link></h1></header>
}

const HeaderStyled = styled(Header)`
  border-botton: 1px solid gray;
`;

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function Nav(props) {
  const liTags = props.data.map((e) => {
    return <li key={e.id}><Link to={'/read/' + e.id} onClick={(evt) => {
      props.onSelect(e.id);
    }}>{e.title}</Link></li>
  })
  return <nav><ol>{liTags}</ol></nav>
}

function Create({onCreate}) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={(evt) => {
        evt.preventDefault();
        console.dir(evt.target);
        const title = evt.target.title.value;
        const body = evt.target.body.value
        onCreate(title, body);
      }}>
        <p><input type="text" name='title' placeholder='title' /></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type="submit" value='Create' /></p>
      </form>
    </article>
  )
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    {id: 1, title:'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
  ])

  let content = null;

  if(mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB!"></Article>
  }
  else if(mode === 'READ') {
    const topic = topics.filter(e => {
      if(e.id === id) {
        return true;
      }
      else {
        return false;
      }
    })[0];
    console.log(topic);
    content = <Article title={topic.title} body={topic.body}></Article>
  }
  else if(mode === 'CREATE') {
    content = <Create onCreate={(title, body) => {
      const newTopic = {id: nextId, title, body}
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setId(nextId);
      setMode('READ');
      setNextId(nextId+1);
    }} />
  }

  // function createHandler() {
  //   alert('create!');
  // }

  return (
    <div>
      <HeaderStyled onSelect={() => {
        // mode = 'WELCOME';
        setMode('WELCOME');
      }}></HeaderStyled>
      <Nav data={topics} onSelect={(id) => {
        // mode = 'READ';
        setMode('READ');
        setId(id);
      }}></Nav>
      {content}
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button component={Link} to="/create" variant='outlined' onClick={() => {
          setMode('CREATE')
        }}>Create</Button>
        <Button variant='outlined'>Update</Button>
      </ButtonGroup>
      <Button variant='outlined' onClick={() => {
        const newTopics = topics.filter(e => e.id !== id);
        setTopics(newTopics);
        setMode('WELCOME');
      }}>Delete</Button>
    </div>
  );
}

export default App;
