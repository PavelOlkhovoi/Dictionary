import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import Loading from '../../components/Loading';
import WordInText from '../../components/text/WordInText';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectWordsArrById } from '../../store/slices/wordSlice';
import { styleTW } from '../../style';
import { WordDb } from '../types/word';

const SingleText = () => {
    const {idtext} = useParams()
    const text = useAppSelector(state => state.text.texts.find(text => text.textId === idtext))
    const words = useAppSelector(state => selectWordsArrById(state, text?.wordsIds as string[]))
    const textsStatus = useAppSelector(state => state.text.status)

    if(textsStatus === 'pending'){
        <Loading />
    }

    useEffect(()=> {
        console.log("text", text?.wordsIds)
    }, [])
    return <div className={`${styleTW.container} p-8`}>
        {
            text?.wordsIds.map(id => <WordInText id={id} key={id}/>)
        }
        <div className='my-8'>
            {
                text?.text
            }
        </div>
    </div>;
}


export default SingleText;