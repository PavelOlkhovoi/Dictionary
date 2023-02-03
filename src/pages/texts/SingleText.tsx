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
        <div className='flex gap-3'>
            <h1 className={`${styleTW.title1}`}>{text?.title}</h1>
            <MyButton>
                <Link to={{pathname: `/texts/edit/${idtext}`}}>Edit</Link>
            </MyButton>
        </div>
        {
            words?.map(w => <div key={w.wordId}>{w.word}</div>)
        }
        <div className='my-8'>
            <TextHighlighter words={words as WordDb[]} text={text?.text as string} wordsBack={wordsBack}/>
        </div>
    </div>;
}


export default SingleText;