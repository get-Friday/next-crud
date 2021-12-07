import useClients from '../../hooks/useClients'
import Button from '../components/Buttons'
import Form from '../components/Form'
import Layout from '../components/Layout'
import Table from '../components/Table'

export default function Home() {  

  const { 
    client,
    clients,
    selectClient, 
    newClient, 
    deleteClient, 
    saveClient,
    tableVisible,
    showTable
  } = useClients()

  return (
    <div className={` 
    flex justify-center items-center h-screen 
    bg-gradient-to-r from-blue-500 to-purple-500
    text-white
    `}>
      <Layout title="Cadastro simples">
        {tableVisible ? (
          <>
            <div className="flex justify-end">
              <Button color="green" className="mb-4" 
                onClick={newClient}>
                Novo cliente
              </Button>
            </div>
            <Table 
              clients={clients} 
              selected={selectClient} 
              deleted={deleteClient} 
            />
          </>
        ) : (
          <Form 
            client={client} 
            cancel={showTable}
            onChange={saveClient}
          />
        )}
      </Layout>
    </div>
  )
}