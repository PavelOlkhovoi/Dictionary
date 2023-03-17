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
import { deleteUserSet, deleteWordInsiteSet, updateUserSet } from "../../backend/crudFunctions/set";
import MyButton from "../../components/wordsForm/ui/MyButton";

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

    const updateWords = async (words: WordsBasicWithId) => {
        const allIds = Object.keys(words)
        const allToShow = allIds.filter(id => words[id].show)
        const deleteWords = allIds.filter(id => !words[id].show)

        if(set && deleteWords.length > 0){
            for(const wordId in deleteWords){
                if(set?.wordsIds.includes(deleteWords[wordId])){
                    await deleteWordInsiteSet(set?.setId as string, deleteWords[wordId])
                }
            }
        }

        const existingWordsArr = allToShow.filter(id => wordsIdsArr.includes(id))
        const finalWordsIdsArr = [...existingWordsArr]

        // for(const id of  allToShow){
        //     if(existingWordsArr.includes(id)){
        //         updateUserFastMeaning(id, words[id].name, words[id].translation)
        //     }else{
        //         const newWordId= await createFastWord({
        //             uid: user?.uid as string,
        //             word: words[id as keyof WordsBasicWithId].name,
        //             meaning: {
        //                 "noun": {
        //                     part
        //                 }
        //             },
        //             fastMeaning: words[id as keyof WordsBasicWithId].translation,
        //             examples: [{example: '', translation: ''}],
        //             level: 'low',
        //             points: 0,
        //             priority: 'low',
        //             repeat: true,
        //             createdAt: serverTimestamp() as Timestamp
        //         })

        //         finalWordsIdsArr.push(newWordId as string)

        //     }
        // }

        finalWordsIdsArr.length > 0 && updateUserSet(set?.setId as string, title.value, source.value !== '' ?
        source.value : null , finalWordsIdsArr)

    }

    const deleteSet = async (setId: string) => {
        await deleteUserSet(setId)
    }


    useEffect(()=> {
        if(set){
            title.setInput(set.name) 
            source.setInput(set.source ? set.source : '')
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
                <FastAddWord getWords={updateWords} oldWords={words}/>

                <div className="mt-4"><MyButton color='red' onClick={()=> deleteSet(set?.setId as string)}>Delete set</MyButton></div>
            </div>
        </section>

    )
}

export default EditSet;