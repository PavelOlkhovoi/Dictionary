import {useState, useEffect} from 'react'
import FastAddWord, { WordsBasicWithId } from "../../components/fastWords/FastAddWord";
import Loading from "../../components/Loading";
import { useAppSelector } from "../../hooks/redux-hooks";
import useInput from "../../hooks/useInput";
import { styleTW } from "../../style";
import { serverTimestamp, Timestamp} from "firebase/firestore"; 
import { Set, WordDb } from "../../types/word";
import { addManyWords } from "../../backend/crudFunctions/words";
import { createUserSet } from "../../backend/crudFunctions/set";
import MyInput from "../../components/wordsForm/ui/MyInput";
import useWatchValidation from "../../hooks/useWatchValidation";
import useValidation, { Validations } from "../../hooks/useValidation";
import ShowError from "../../components/validations/ShowError";

const AddSet = () => {
    const wordsStatus = useAppSelector(state => state.word.status)
    const textsStatus = useAppSelector(state => state.text.status)
    const user = useAppSelector(state => state.user.user)
    const uidStatus = useAppSelector(state => state.user.status)
    
    const name = useInput('')
    const source = useInput('')
    const namePattern: Validations = {isEmpty: true}
    const nameValidation = useValidation(name.value, namePattern)
    const [startNameValidation, setStartNameValidation] = useState(false)

    const getWords = async (words: WordsBasicWithId)=> {
        const idsArr = Object.keys(words)
        const clearIds = idsArr.filter(id => words[id as keyof WordsBasicWithId].show)
        .filter(id => words[id as keyof WordsBasicWithId].word !== '' && 
        words[id as keyof WordsBasicWithId].translation !== '')
        
        const wordsArr: WordDb[] = clearIds.map(id => ({
            uid: user?.uid as string,
            word: words[id as keyof WordsBasicWithId].word,
            meaning: {noun: {translation: []}},
            fastMeaning: words[id as keyof WordsBasicWithId].translation,
            examples: [],
            level: 'low',
            points: 0,
            priority: 'low',
            repeat: true,
            createdAt: serverTimestamp() as Timestamp,
            repetition: {
                firstRepetition: false,
                secondRepetition: false,
                thirdRepetition: false,
                fourthRepetition: false,
                fifthRepetition: false,
                sixthRepetition: false,
                seventhRepetition: false
            }
        }))

        const res = await addManyWords(wordsArr)
        res.length > 0 && saveSet(res)
    }

    useEffect(() => {
        nameValidation.correctField && 
        setStartNameValidation(prev => false)
    }, [nameValidation.correctField])

    const validatorsWatcher = useWatchValidation()

    const saveSet = async (wordsIds: string[]) => {
        if(user){
            const newSet: Set = {
                wordsIds,
                textIds: [],
                repeatIds: wordsIds,
                name: name.value,
                uid: user.uid ,
                createdAt: serverTimestamp() as Timestamp,
                source: source.value === '' ? null : source.value
            }

            const res = await createUserSet(newSet)
            return res
        }
       
    }

    if(wordsStatus === 'pending' || textsStatus === 'pending' || uidStatus === 'pending'){
        return <Loading />
    }

    return (
        <section className={`${styleTW.containerWide} pb-20`}>
            <h1 className={`${styleTW.title1} mt-8`}>Add new set</h1>
            <div className="py-8 pb-20">
                <div className={`pt-10 pb-10 ${styleTW.cardWhite} `}>
                    <MyInput 
                    name="name"
                    label="name"
                    value={name.value}
                    onBlur={e => setStartNameValidation(prev => true)}
                    onChange={name.onChange}
                    />
                    <ShowError show={startNameValidation} hookName={nameValidation} />
                </div>
                <div className={`pt-10 pb-10 mt-8 ${styleTW.cardWhite}`}>
                    <MyInput 
                    name="source"
                    label="source"
                    value={source.value}
                    onChange={source.onChange}
                    />
                </div>
                <FastAddWord 
                getWords={getWords} 
                customHook={validatorsWatcher.handleFields}
                formReady={validatorsWatcher.checkResult}
                isNameValid={nameValidation.correctField}
                />
            </div>
        </section>
    )
}

export default AddSet;