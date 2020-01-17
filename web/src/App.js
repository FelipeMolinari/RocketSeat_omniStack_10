import React, { useEffect, useState } from 'react';
import "./global.css"
import "./App.css"
import "./Sidebar.css"
import "./Main.css"
import api from './services/api'
import DevItem from './components/DevItens/index.js';
//Componente: Bloco isolado de HTML, CSS e JS. Nao interfere no restante da app.
//Propriedade: Informações que um comp pai passa para o componente filho
//Estado: Informações mantidas pelo componente. (Imutabilidade... Não se altera uma informação, ao inves disso é criado uma nova variável em cima)

import DevForm from './components/DevForm/index.js'

function App() {

  const [devs, setDevs] = useState([])


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data)
    }
    loadDevs()
  }, [])



  async function handleAddDev(data) {

    const response = await api.post('/devs', data)

    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>

        <ul>
          {devs.map(dev => {
            return (
              <DevItem key={dev._id} dev={dev} />
            )
          })}


        </ul>
      </main>
    </div>
  )
}

export default App;
