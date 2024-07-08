import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Item from './components/item'

function App() {
  const [itens, setItens] = useState(
    [
      {
        "_id": "668b48e1f3a9a020663845c5",
        "text": "teste",
        "edit": false,
        "active": true
      },
      {
        "_id": "668b490ef3a9a020663845c6",
        "text": "luccas",
        "edit": false,
        "active": true
      }
    ]
  )
  return (
    <div className="wrapper">
      <h1>To Do App</h1>

      {itens.map(item => {
        return <Item item={item} />
      })}

      <button>Todos</button>
      <button>Pendentes</button>
      <button>Concluidos</button>
    </div>
  );
}

export default App;
