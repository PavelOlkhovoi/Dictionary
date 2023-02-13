import FastAddWord, { WordsBasicWithId } from "../../components/fastWords/FastAddWord";
import Loading from "../../components/Loading";
import { useAppSelector } from "../../hooks/redux-hooks";
import useInput from "../../hooks/useInput";
import { styleTW } from "../../style";
import { serverTimestamp, Timestamp} from "firebase/firestore"; 
import { Set, WordDb } from "../types/word";
import { addManyWords } from "../../backend/crudFunctions/words";
import { createUserSet } from "../../backend/crudFunctions/set";

const AddSet = () => {
    const words = useAppSelector(state => state.word.words)
    const wordsStatus = useAppSelector(state => state.word.status)
    const texts = useAppSelector(state => state.text.texts)
    const textsStatus = useAppSelector(state => state.text.status)
    const user = useAppSelector(state => state.user.userFake)
    const uidStatus = useAppSelector(state => state.user.status)

    const name = useInput('')
    const source = useInput('')

    const getWords = async (words: WordsBasicWithId)=> {
        const idsArr = Object.keys(words)
        const wordsArr: WordDb[] = idsArr.filter(id => words[id as keyof WordsBasicWithId].show && words[id as keyof WordsBasicWithId].name !== '' &&
        words[id as keyof WordsBasicWithId].translation !== '').map(id => ({
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
        }))

        const res = await addManyWords(wordsArr)

        res.length > 0 && saveSet(res)
    }

    const saveSet = async (wordsIds: string[]) => {
        if(user){
            const newSet: Set = {
                wordsIds, 
                name: name.value,
                uid: user.uid ,
                createdAt: serverTimestamp() as Timestamp,
                source: source.value === '' ? null : source.value
            }

            const res = await createUserSet(newSet)

            return res
        }
       
        console.log("Lack of data to create new set")
    }

    if(wordsStatus === 'pending' || textsStatus === 'pending' || uidStatus === 'pending'){
        return <Loading />
    }

    return (
        <section className={styleTW.container}>
            <h1 className={`${styleTW.title1} mt-8`}>Add new set</h1>
            <div className="p-8">
                <div className={styleTW.card}>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                        <input className={`${styleTW.shadow} w-full my-2`} type="text" value={name.value} onChange={name.onChange}/>
                    </label>
                </div>
                <div className={styleTW.card}>
                    <label className="block text-sm font-medium text-gray-700">
                        Source
                        <input className={`${styleTW.shadow} w-full my-2`} type="text" value={source.value} onChange={source.onChange}/>
                    </label>
                </div>
                <FastAddWord getWords={getWords}/>
            </div>
        </section>
    )
}

export default AddSet;