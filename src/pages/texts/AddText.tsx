import {useEffect, useState} from 'react';
import useInput from '../../hooks/useInput';
import MyInput from '../../components/wordsForm/ui/MyInput';
import { styleTW } from '../../style';
import MyButton from '../../components/wordsForm/ui/MyButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import Loading from '../../components/Loading';
import ShowTagWithWords from '../../components/tags/ShowTagWithWords';
import { AllWordsSorted } from '../types/word';
import TextHighlighter from '../../components/text/TextHighlighter';


const AddText = () => {
    const tags = useAppSelector(state => state.tag.tags)
    const words = useAppSelector(state => state.word.words)
    const uid = useAppSelector(state => state.user.userFake?.uid)
    const tagsStatus = useAppSelector(state => state.tag.status)
    const wordStatus = useAppSelector(state => state.word.status)
    const title = useInput('')
    const [text, setText] = useState('')
    const [usedWords, setUsedWords] = useState<AllWordsSorted[]>([])

    const wordsBack = (words: AllWordsSorted[]) => {
        setUsedWords(words)
    }



    const addTextHandler = async () => {
        const simpleWords: string[] = []
        const compoundWords: string[] = []
        const sentences = text.split('.')

        sentences.forEach(s => {
            // arrSimpleWords.forEach(w => {
            //     s.includes(w) && simpleWords.push(w)
            // })
        })

        sentences.forEach(s => {
            // arrСompoundWords.forEach(w => {
            //     s.includes(w) && compoundWords.push(w)
            // })
        })

        // const arrIds = words.filter(w => [...simpleWords, ...compoundWords].includes(w.word)).map(w => w.wordId)


        
        // const response = await createText(title.value, text, arrIds, uid as string)
        // console.log(response)
    }

    
    useEffect(()=> {
        console.log('dddd', usedWords)
    }, [usedWords])


    if( tagsStatus === 'pending'  || wordStatus  === 'pending'){
        return <Loading />
    }


    return (
        <section className={styleTW.container}>
            <div className='p-8'>
                <h1 className={styleTW.title1}>Add your text</h1>
                <MyInput value={title.value} onChange={title.onChange} label='title' name="title"/>
                <div className='my-8'>
                    <h3 className="block mb-2 mt-8 text-sm font-medium text-gray-700 undefined">
                        Hints
                    </h3>
                <div className='flex flex-wrap'>
                {
                    tags.map(tag => <ShowTagWithWords tag={tag} key={tag.tagId}/> )
                }   
                </div>
                </div>
                <label htmlFor=""className="block mb-2 mt-8 text-sm font-medium text-gray-700 undefined">
                    Type text
                </label>
                <TextHighlighter text={text} words={words} wordsBack={wordsBack}>
                    <textarea className={`${styleTW.shadow} mb-8`} name="text" 
                    value={text}
                    onChange={(e)=> setText(e.target.value)}
                    rows={10}
                    />
                </TextHighlighter>
        </div>
        </section>
    );
}


export default AddText;