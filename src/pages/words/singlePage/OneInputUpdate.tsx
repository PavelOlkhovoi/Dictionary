import {useState} from 'react'
import OneInputUi from '../ui/OneInputUi'
import useValidation from '../../../hooks/useValidation'
import ShowError from '../../../components/validations/ShowError'

interface Props {
    value: string
    name: string
    sendToDB: (id: string) => void
}
const OneInputUpdate = ({value, sendToDB, name}: Props) => {
    const [text, setText] = useState(value)
    const textValidation = useValidation(text, {isEmpty: true})
    const [startValidation, setStartValidation] = useState(false)

    const updateText = (inputValue: string) => {
        setText(prev => inputValue)
    }

    const fireValidation = () => {
        setStartValidation(prev => true)
    }

    const stopValidation = () => {
        setStartValidation(prev => false)
    }

    const sendInputToDb = () => {
        if(textValidation.correctField){
            sendToDB(text)
            stopValidation()
        }
    }
    
    return (
        <>
        <OneInputUi 
        value={text} 
        name={name}
        changeValue={updateText}
        sendToDb={sendInputToDb}
        fireValidation={fireValidation}
        />

        <ShowError show={startValidation} hookName={textValidation}/>
        </>
    )
}

export default OneInputUpdate;