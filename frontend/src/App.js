import React, { useEffect, useState } from 'react';
import api from './services/api';
import './App.css';
import backend from './services/backend';
import Notify from './alerts/toast';

const notify = new Notify()




function App() {
  const [clientes, setClientes] = useState([])
  const [motivo, setMotivo] = useState('')
  const [data, setData] = useState('')
  const [valor, setValor] = useState('')
  const [client, setClient] = useState('0')


  useEffect(() => {

    async function loadClientes() {
      const response = await api.get('/users')
      setClientes(response.data)

    }

    loadClientes();
  })

  async function handleSubmit(event) {
    event.preventDefault();
    let id = ''
    if (client === 0) id = client
    id = client - 1;
   
    const response = await backend.post('/api', {

      cliente: clientes[id].name,
      motivo: motivo,
      valor: valor,
      date: data,
      id_cliente: client
    })
   return notify.success(response.data.message)
  }


  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <fieldset>

            <legend className="legend">
              <strong><h2>Cadastro da divida
                </h2>
              </strong>
            </legend>
            <div className='btn'>
              <p>
                <label for="name">Cliente: </label>
                <select value={client} onChange={event => setClient(event.target.value)} type="text" name="cliente" required>
                  {clientes.map(cliente => (
                    <option value={cliente.id}>{cliente.name}</option>
                  ))}
                </select>

              </p>
              <p>      <label for="obs">Motivo: </label>
                <input onChange={event => setMotivo(event.target.value)} type="text" name="obs" required></input>
              </p>
              <p>
                <label for="value">Valor R$: </label>
                <input onChange={event => setValor(event.target.value)} type="number" name="value" required></input>
              </p>
              <p>
                <label for="date">Data: </label>
                <input onChange={event => setData(event.target.value)} type="date" name="date" required></input>
              </p>

            </div>




            <button type="submit">Cadastrar</button>


          </fieldset>
        </form>
      </header>
    </div>
  );
}

export default App;
