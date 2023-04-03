import {useState} from 'react'
import OneInputUi from '../ui/meanings/OneInputUi'
import { updateUserFastMeaning } from '../../../backend/crudFunctions/words'
import useValidation from '../../../hooks/useValidation'
import ShowError from '../../../components/validations/ShowError'

interface Props {
    fastMeaning: string
    wordId: string,
    word: string,
}
const OneInputUpdate = ({fastMeaning, wordId, word}: Props) => {
    const [meaning, setMeaning] = useState(fastMeaning)
    const meaningValidation = useValidation(meaning, {isEmpty: true})
    const [startValidation, setStartValidation] = useState(false)


    const updateMeaning = (text: string) => {
        setMeaning(prev => text)
    }

    const fireValidation = () => {
        setStartValidation(prev => true)
    }

    const stopValidation = () => {
        setStartValidation(prev => false)
    }

    const sendToDb = () => {
        if(meaningValidation.correctField){
            updateUserFastMeaning(wordId, word, meaning)
            stopValidation()
        }
    }
    
    return (
        <>
        <OneInputUi 
        value={meaning} 
        changeValue={updateMeaning}
        sendToDb={sendToDb}
        fireValidation={fireValidation}
        />

        <ShowError show={startValidation} hookName={meaningValidation}/>
        </>
    )
}

export default OneInputUpdate;