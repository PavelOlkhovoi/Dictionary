import {useParams} from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import { styleTW } from '../../style'
import Loading from '../../components/Loading'
import TextHighlighter from '../../components/text/TextHighlighter'
import {useState, useEffect} from 'react'
import { selectTextById } from '../../store/slices/textSlice'
import { AllWordsSorted } from '../../types/word'
import ShowTagWithWords from '../../components/tags/ShowTagWithWords'
import { updateUserText } from '../../backend/crudFunctions/text'
import useInput from '../../hooks/useInput'


const EditText = () => {
    const {idtext} = useParams()
    const text = useAppSelector(state => selectTextById(state, idtext as string))
    const words = useAppSelector(state => state.word.words)
    const tags = useAppSelector(state => state.tag.tags)
    const uid = useAppSelector(state => state.user.userFake?.uid)
    const tagsStatus = useAppSelector(state => state.tag.status)
    const wordsStatus = useAppSelector(state => state.word.status)
    const textsStatus = useAppSelector(state => state.text.status)
    const [oldText, setOldText] = useState<string>('')
    const [usedWords, setUsedWords] = useState<AllWordsSorted[]>([])
    const title = useInput('')

    const updateText = async (words: AllWordsSorted[]) => {
        const ids: string[] = words.map(w => w.wordId)
        const response = await updateUserText(text?.textId as string, ids, oldText, title.value, uid as string)
        console.log('Text update?', response)
    }

    const getUsedWords = (words: AllWordsSorted[]) => {
        setUsedWords(words)
        updateText(words)
    }

    if(textsStatus === 'pending' || wordsStatus === 'pending' || tagsStatus === 'pending'){
        <Loading />
    }

    useEffect(()=> {
       if(text){
        setOldText(text.text)
        title.setInput(text.title)
       }
    }, [text])

    
    return (
        <section className={`${styleTW.container} p-4`}  >
            <h1 className={`${styleTW.title1} mt-4 mb-10`}>{text?.title}</h1>
            <input 
                type='text'
                name='text'
                value={title.value} 
                onChange={title.onChange}
                className={`${styleTW.shadow}`} 
            />
            <div className='my-8'>
                <h3 className="block mb-2 mt-8 text-sm font-medium text-gray-700">
                    Hints
                </h3>
                <div className='flex flex-wrap'>
                {
                    tags.map(tag => <ShowTagWithWords tag={tag} key={tag.tagId}/> )
                }   
                </div>
            </div>
            {
                words && oldText && <TextHighlighter 
                words={words} 
                text={oldText} 
                wordsBack={getUsedWords}
                textButton="Save text"
            >
                <textarea className={`${styleTW.shadow} mb-8`} name="text" 
                    value={oldText}
                    onChange={(e)=> setOldText(e.target.value)}
                    rows={10}
                />
            </TextHighlighter>
            }
        </section>
    );
}

export default EditText;