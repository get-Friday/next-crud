import Client from '../src/core/Client'
import ClientRepo from '../src/core/ClientRepo'
import ClientColection from '../backend/db/ClientColection'
import { useEffect, useState } from 'react'
import useVisibility from './useVisibility'

export default function useClients() {
    const repo: ClientRepo = new ClientColection()

    const { tableVisible, formVisible, showForm, showTable } = useVisibility()

    const [client, setClient] = useState<Client>(Client.vazio())
    const [clients, setClients] = useState<Client[]>([])

    useEffect(getAll, [])

    function getAll() {
        repo.getAll().then(clients => {
            setClients(clients)
            showTable()
        })
    }

    function selectClient(client: Client) {
        setClient(client)
        showForm()
    }

    function newClient() {
        setClient(Client.vazio())
        showForm()
    }

    async function deleteClient(client: Client) {
        await repo.delete(client)
        getAll()
    }

    async function saveClient(client: Client) {
        await repo.save(client)
        getAll()
    }

    return {
        client,
        clients,
        selectClient,
        deleteClient,
        newClient,
        saveClient, 
        getAll,
        tableVisible,
        showTable
    }
}