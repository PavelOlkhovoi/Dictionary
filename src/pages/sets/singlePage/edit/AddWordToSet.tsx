import {useState, useEffect} from 'react'
import OneSimpleInput from '../singlePageUi/OneSimpleInput'
import MyInput from '../../../../components/wordsForm/ui/MyInput'
import { useAppSelector } from '../../../../hooks/redux-hooks'
import { selectWordsAsStringInArr } from '../../../../store/slices/wordSlice'
import useValidation from '../../../../hooks/useValidation'
import ShowError from '../../../../components/validations/ShowError'
import LineButton from '../../../../components/ui-elements/buttons/LineButton'
import { newWordShape } from '../../../../helpers/wordShapePreparation'
import { createFastWord } from '../../../../backend/crudFunctions/words'
import { updateUserSet } from '../../../../backend/crudFunctions/set'

interface CommonState {
    word: string
    meaning: string
}

interface StartValidation {
    word: boolean
    meaning: boolean
}

interface Props {
    uid: string
    setId: string
    name: string
    wordsIds: string[]
}

const AddWordToSet = ({uid, setId, name, wordsIds}: Props) => {
    const allWords = useAppSelector(state => selectWordsAsStringInArr(state))
    const [commonState, setCommonState] = useState<CommonState>({
        word: '',
        meaning: ''
    })

    const wordValidation = useValidation(commonState.word, {isEmpty: true, isTextUnique: allWords})
    const meaningValidation = useValidation(commonState.meaning, {isEmpty: true})

    const [startValidation, setStartValidation] = useState<StartValidation>({word: false, meaning: false})

    const changeState = (field: keyof CommonState, text: string) => {
        setCommonState(cState => ({...cState, [field]: text}))
    }

    const startValidationHandle = (field: keyof StartValidation) => {
        setStartValidation(vState => ({...vState, [field]: !vState[field]}))
    }
    
    const createWordInDb = async () => {
        if(uid){
            const word = newWordShape(uid, commonState.word, commonState.meaning)
            const res = await createFastWord(word)
            res && updateUserSet(setId, name, null, [...wordsIds, res])
            setCommonState(cState => ({word: '', meaning: ''}))
            setStartValidation(vState => ({word: false, meaning: false}))
        }
    }


    return (
        <div className='my-8'>
            <div className='mb-4'>
            <MyInput
                label='word'
                name='word'
                value={commonState.word}
                onChange={(e) => changeState('word', e.target.value)}
                onBlur={() => startValidationHandle('word')}
            />
            <ShowError show={startValidation.word} hookName={wordValidation} />
            </div>
            <div className='my-4'>
            <MyInput
                label='meaning'
                name='meaning'
                value={commonState.meaning}
                onChange={(e) => changeState('meaning', e.target.value)}
                onBlur={() => startValidationHandle('meaning')}
            />
            <ShowError show={startValidation.meaning} hookName={meaningValidation} />
            </div>

            <LineButton
            color='green'
            detach={!(wordValidation.correctField && meaningValidation.correctField)}
            onClick={createWordInDb}
            >
                Save
            </LineButton>
        </div>
    )
}


export default AddWordToSet;