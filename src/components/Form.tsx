import Input from './Input'
import Button from './Buttons'
import Client from '../core/Client'
import { useState } from 'react'

interface FormProps {
    client: Client
    onChange?: (client: Client) => void
    cancel?: () => void
}

export default function Form(props: FormProps) {
    const id = props.client?.id 
    const [name, setName] = useState(props.client?.nome ?? '')
    const [age, setAge] = useState(props.client?.idade ?? 0)
    return (
        <div>
            {id ? (
                <Input readOnly text="ID" value={id} />
            ) : false}
            <Input text="Nome" value={name} onChange={setName} />
            <Input text="Idade" type="number" value={age} onChange={setAge}/>
            <div className="flex justify-end mt-4">
                <Button color="blue" className="mr-2" onClick={() => props.onChange?.(new Client(name, +age, id))}>{id ? 'Alterar' : 'Salvar'}</Button>
                <Button onClick={props.cancel}>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}