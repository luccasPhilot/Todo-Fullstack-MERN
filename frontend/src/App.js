//import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Item from './components/item'

function App() {
  const [itens, setItens] = useState([])
  const [filterItens, setFilterItens] = useState({ filter: false, active: false })

  function getData() {
    fetch('http://localhost:3000/todo/list', { method: "GET" })
      .then(response => response.json())
      .then(data => setItens(data))
  }

  function insertDocuments() {
    fetch('http://localhost:3000/todo/add',
      {
        method: "POST",
        headers: { 'content-type': "application/json" },
        body: JSON.stringify({ "text": "", "active": true })
      })
      .then(response => response.json)
      .then(() => getData())
  }

  function updateDocuments(item) {
    fetch('http://localhost:3000/todo/update',
      {
        method: "PATCH",
        headers: { 'content-type': "application/json" },
        body: JSON.stringify(item)
      })
      .then(response => response.json)
      .then(() => getData())
  }

  function deleteDocuments(item) {
    fetch('http://localhost:3000/todo/delete',
      {
        method: "DELETE",
        headers: { 'content-type': "application/json" },
        body: JSON.stringify(item)
      })
      .then(response => response.json)
      .then(() => getData())
  }

  useEffect(() => {
    getData()
  }, [])

  const itensToShow = filterItens.filter ? itens.filter(item => item.active === filterItens.active) : itens

  return (
    <div className="wrapper">
      <div className="to-do-list">
        <h1>To Do App</h1>

        {itensToShow.map(item => {
          return <Item item={item} updateDocuments={updateDocuments} deleteDocuments={deleteDocuments} />
        })}
        <div className='buttonRow'>
          <button onClick={() => setFilterItens({ filter: false })} style={filterItens.filter ? {} : { fontWeight: "bold" }}>Todos</button>
          <button onClick={() => setFilterItens({ filter: true, active: true })} style={((filterItens.filter) && (filterItens.active === true)) ? { fontWeight: "bold" } : {}}>Pendentes</button>
          <button onClick={() => setFilterItens({ filter: true, active: false })} style={((filterItens.filter) && (filterItens.active === false)) ? { fontWeight: "bold" } : {}} >Concluidos</button>
        </div>
        <div className='buttonRow'>
          <button onClick={insertDocuments}>Inserir novo To-do</button>
        </div>
      </div>
    </div>

  );
}

export default App;
