import {Link, useParams} from 'react-router-dom'
import Loading from '../../components/Loading';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectWordsArrById } from '../../store/slices/wordSlice';
import { styleTW } from '../../style';
import MyButton from '../../components/wordsForm/ui/MyButton';
import TextHighlighter from '../../components/text/TextHighlighter';
import { AllWordsSorted, WordDb } from '../types/word';
import { useState, useEffect } from 'react';


const SingleText = () => {
    const {idtext} = useParams()
    const text = useAppSelector(state => state.text.texts.find(text => text.textId === idtext))
    const words = useAppSelector(state => selectWordsArrById(state, text?.wordsIds as string[]))
    const textsStatus = useAppSelector(state => state.text.status)
    const [usedWords, setUsedWords] = useState<AllWordsSorted[]>([])

    const wordsBack = (words: AllWordsSorted[]) => {
        setUsedWords(words)
    }

    if(textsStatus === 'pending'){
        <Loading />
    }

    useEffect(()=> {
        console.log('dddd', usedWords)
    }, [usedWords])

    return <div className={`${styleTW.container} p-8`}>
        <div className='flex gap-3 md:gap-12 leading-tight items-center mb-12'>
            <h1 className={`${styleTW.title1} `}>{text?.title}</h1>
            <MyButton>
                <Link to={{pathname: `/texts/edit/${idtext}`}}>Edit</Link>
            </MyButton>
        </div>
       <div className='md:flex gap-10'>
        <h2 className={styleTW.title3}>Used words</h2>
            <ul className='list-disc'>
            {
                words?.map(w => <li key={w.wordId}>{w.word}</li>)
            }
            </ul>
       </div>
        <div className='my-8'>
        <h2 className={`${styleTW.title3} md:mb-4`}>Text</h2>
            {
                words && <TextHighlighter words={words as WordDb[]} text={text?.text as string} wordsBack={wordsBack}/>
            }
        </div>
    </div>;
}


export default SingleText;