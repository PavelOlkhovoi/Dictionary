import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useAppSelector } from "../../hooks/redux-hooks";
import useInput from "../../hooks/useInput";
import { styleTW } from "../../style";
import { selectAllWordsIdsInArr, selectWordsArrById } from "../../store/slices/wordSlice";
import FastAddWord, { WordsBasicWithId } from "../../components/fastWords/FastAddWord";
import { createFastWord, updateUserFastMeaning } from "../../backend/crudFunctions/words";
import { serverTimestamp, Timestamp} from "firebase/firestore";
import { updateUserSet } from "../../backend/crudFunctions/set";

const EditSet = () => {
    const {idtext} = useParams()
    const set = useAppSelector(state => state.set.sets.find(s => s.setId === idtext))
    const setStatus = useAppSelector(state => state.set.status)
    const words = useAppSelector(state => selectWordsArrById(state, set?.wordsIds))
    const wordsStatus = useAppSelector(state => state.word.status)
    const wordsIdsArr = useAppSelector(state => selectAllWordsIdsInArr(state))
    const user = useAppSelector(state => state.user.userFake)
    
    const title = useInput('')
    const source = useInput('')

    const getWords = async (words: WordsBasicWithId) => {
        console.log('Zogla word', words)
        const existingordsArr = Object.keys(words).filter(id => wordsIdsArr.includes(id))
        const finalWordsIdsArr = [...existingordsArr]

        const wordsArrIds = Object.keys(words)
        for(const id of wordsArrIds){
            if(existingordsArr.includes(id)){
                updateUserFastMeaning(id, words[id].name, words[id].translation)
            }else{
               // 2 get New arr
                console.log('Test Create Fast', words[id as keyof WordsBasicWithId].name)
                const newWordId= await createFastWord({
                    uid: user?.uid as string,
                    word: words[id as keyof WordsBasicWithId].name,
                    meaning: {
                        nothing: ['']
                    },
                    fastMeaning: words[id as keyof WordsBasicWithId].translation,
                    examples: [{example: '', translation: ''}],
                    level: 'low',
                    points: 0,
                    priority: 'low',
                    repeat: true,
                    createdAt: serverTimestamp() as Timestamp
                })

                const newObj = {
                    ...words,
                    [newWordId as string]: {

                    }
                }

                // words[id as keyof WordsBasicWithId] = newWordId as string

                finalWordsIdsArr.push(newWordId as string)

            }
        }

        console.log('final res', finalWordsIdsArr)

        updateUserSet(set?.setId as string, title.value, null, finalWordsIdsArr)

    }


    useEffect(()=> {
        // console.log('Set changed', set, words)
        if(set){
            title.setInput(set.name) 
            source.setInput(set.sourse ? set.sourse : '')
        }
    }, [set])

    if(setStatus === 'pending' || wordsStatus === 'pending'){return <Loading />}

    return (
        <section className={`${styleTW.container}`}>
            <h1 className={`${styleTW.title1} mt-8`}>Add new set</h1>
            <div className="p-8">
                <div className={styleTW.card}>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                        <input className={`${styleTW.shadow} w-full my-2`} type="text" value={title.value} onChange={title.onChange}/>
                    </label>
                </div>
                <div className={styleTW.card}>
                    <label className="block text-sm font-medium text-gray-700">
                        Source
                        <input className={`${styleTW.shadow} w-full my-2`} type="text" value={source.value} onChange={source.onChange}/>
                    </label>
                </div>
                <FastAddWord getWords={getWords} oldWords={words}/>
            </div>
        </section>

    )
}

export default EditSet;