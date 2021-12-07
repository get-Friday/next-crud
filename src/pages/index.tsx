import Button from '../components/Buttons'
import Form from '../components/Form'
import Layout from '../components/Layout'
import Table from '../components/Table'
import Client from '../core/Client'
import ClientRepo from '../core/ClientRepo'
import ClientColection from '../../backend/db/ClientColection'
import { useEffect, useState } from 'react'

export default function Home() {

  const repo: ClientRepo = new ClientColection()
  
  const [client, setClient] = useState<Client>(Client.vazio())
  const [clients, setClients] = useState<Client[]>([])
  const [visible, setVisible] = useState<'table' | 'form'>('table')

  useEffect(getAll, [])

  function getAll() {
    repo.getAll().then(clients => {
      setClients(clients)
      setVisible('table')
    })
  }

  function selectedClient(client: Client) {
    setClient(client)
    setVisible('form')
  }

  function newClient() {
    setClient(Client.vazio())
    setVisible('form')
  }

  async function deletedClient(client: Client) {
    await repo.delete(client)
    getAll()
  }

  async function saveClient(client: Client) {
    await repo.save(client)
    getAll()
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