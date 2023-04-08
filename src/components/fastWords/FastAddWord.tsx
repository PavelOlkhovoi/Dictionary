import {useState, useEffect} from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { styleTW } from '../../style'
import { WordDb } from '../../types/word'
import { makeObjForFastAdding } from '../../helpers/manipulateArr'
import LineButton from '../ui-elements/buttons/LineButton'
import { Validations } from '../../hooks/useValidation'
import OneSimpleInput from '../../pages/sets/singlePageUi/OneSimpleInput'
import { useAppSelector } from '../../hooks/redux-hooks'
import { selectWordsArrWithName } from '../../store/slices/wordSlice'

export interface WordsBasicWithId {
    [index: string]: WordsBasic
}

interface WordsBasic {
    word: string
    translation: string
    show: Boolean
}

interface Props {
    getWords: Function
    oldWords?: WordDb[] | null
    customHook: (id: string, fieldsName: string, isValid: boolean) => void
    formReady: boolean
    isNameValid: boolean
}

const FastAddWord = ({getWords, oldWords = null, customHook, formReady, isNameValid}: Props) => {
const allWords = useAppSelector(state => selectWordsArrWithName(state))
const [words, setWords] = useState<WordsBasicWithId>(oldWords ? makeObjForFastAdding(oldWords) : {
    [nanoid()]: { word: '', translation: '', show: true} 
    })

    const wordPattern: Validations = {isEmpty: true, isTextUnique: allWords}

    const valueHandle = (name: string, value: string, wordId: string, isValid: boolean) => {
        setWords(prev => ({
            ...prev,
            [wordId as keyof WordsBasicWithId]: {
                ...prev[wordId as keyof WordsBasicWithId],
                [name]: value
            }
        }))
    }

    useEffect(()=> {
        if(oldWords){
            setWords(makeObjForFastAdding(oldWords as WordDb[]))
        }
    }, [oldWords])

    
    return (
        <div>
            <div className='[&>:last-child]:my-8'>
            {
                Object.keys(words).map(wordId => words[wordId as keyof WordsBasicWithId].show && 
                <div 
                key={wordId} 
                className={`${styleTW.card} mt-6 [&>div]:my-4`}>

                <OneSimpleInput
                    label='word'
                    wordId={wordId}
                    name='word'
                    pattern={wordPattern}
                    value={ words[wordId as keyof WordsBasicWithId].word}
                    valueHandle={valueHandle}
                    customHook={customHook}
                />

                <OneSimpleInput
                    label='translation'
                    wordId={wordId}
                    name='translation'
                    pattern={wordPattern}
                    value={ words[wordId as keyof WordsBasicWithId].translation}
                    valueHandle={valueHandle}
                    customHook={customHook}
                />   

                <LineButton
                onClick={()=> setWords(prev => {
                    return ({
                        ...prev,
                        [wordId as keyof WordsBasicWithId]: {
                            ...prev[wordId as keyof WordsBasicWithId],
                            show: false
                        }
                    })
                })}
                color="red"
                >
                    Delete
                </LineButton>

                </div>)
            }
            <LineButton
             onClick={()=> setWords(prev => {
                const ids = nanoid()
                return ({...prev,
                    [ids]: {
                        word: '',
                    translation: '',
                    show: true
                    }
                })
            })}
            >
                Add Word
            </LineButton>
        </div>
        <LineButton 
        detach={!(isNameValid && formReady)} 
        onClick={()=> getWords(words)} 
        color='green'
        >
            Save set
        </LineButton>
    </div>
    );
}

export default FastAddWord;