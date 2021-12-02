import Client from "../core/Client";
import { EditIcon, TrashIcon } from "./Icons";

interface TableProps {
    clients: Client[]
    selected?: (client: Client) => void
    deleted?: (client: Client) => void
}

export default function Table(props: TableProps) {

    const showActions = props.selected || props.deleted

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                { showActions ? <th className="p-4">Ações</th> : false }
            </tr>
        )
    }

    function renderData() {
        return props.clients?.map((client, i) => {
            return (
                <tr key={`client.id`} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
                    <td className="text-left p-3">{client.id}</td>
                    <td className="text-left p-3">{client.nome}</td>
                    <td className="text-left p-3">{client.idade}</td>
                    {showActions ? renderActions(client) : false }
                </tr>
            )
        })
    }

    function renderActions(client: Client) {
        return (
            <td className="flex justify-center">
                {props.selected ? (
                    <button onClick={() => props.selected?.(client)} className={`
                        flex justify-center items-center
                        text-green-600 rounded-full p-2 m-1
                        hover:bg-purple-50
                    `}>
                        {EditIcon}
                    </button>
                ) : false }

                {props.deleted ? (
                    <button onClick={() => props.deleted?.(client)} className={`
                        flex justify-center items-center
                        text-red-500 rounded-full p-2 m-1
                        hover:bg-purple-50
                    `}>
                        {TrashIcon}
                    </button>
                ) : false }
            </td>
        )
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
                bg-gradient-to-r from-purple-500 to-purple-800
                text-gray-100
            `}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    )
}