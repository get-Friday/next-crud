import Button from '../components/Buttons'
import Form from '../components/Form'
import Layout from '../components/Layout'
import Table from '../components/Table'
import Client from '../core/Client'
import { useState } from 'react'

export default function Home() {
  
  const [client, setClient] = useState<Client>(Client.vazio())
  const [visible, setVisible] = useState<'table' | 'form'>('table')
  const clients = [
    new Client('Ana', 31, '1'),
    new Client('Bia', 11, '2'),
    new Client('Aluiz', 51, '3')
  ]

  function selectedClient(client: Client) {
    setClient(client)
    setVisible('form')
  }

  function newClient() {
    setClient(Client.vazio())
    setVisible('form')
  }

  function deletedClient(client: Client) {
    console.log(`Excluir ${client.nome}`)
  }

  function saveClient(client: Client) {
    console.log(client)
    setVisible('table')
  }

  
  return (
    <div className={` 
    flex justify-center items-center h-screen 
    bg-gradient-to-r from-blue-500 to-purple-500
    text-white
    `}>
      <Layout title="Cadastro simples">
        {visible === 'table' ? (
          <>
            <div className="flex justify-end">
              <Button color="green" className="mb-4" 
                onClick={newClient}>
                Novo cliente
              </Button>
            </div>
            <Table 
              clients={clients} 
              selected={selectedClient} 
              deleted={deletedClient} 
            />
          </>
        ) : (
          <Form 
            client={client} 
            cancel={() => setVisible('table')}
            onChange={saveClient}
          />
        )}
      </Layout>
    </div>
  )
}