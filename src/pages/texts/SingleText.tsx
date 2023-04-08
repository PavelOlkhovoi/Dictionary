import {Link, useParams} from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectWordsArrById } from '../../store/slices/wordSlice';
import { styleTW } from '../../style';
import TextHighlighter from '../../components/text/TextHighlighter';
import { AllWordsSorted, WordDb } from '../../types/word';
import { useState, useEffect } from 'react';
import LineButton from '../../components/ui-elements/buttons/LineButton';
import { firstCapitalLetter } from '../../helpers/display';


const SingleText = () => {
    const {idtext} = useParams()
    const text = useAppSelector(state => state.text.texts.find(text => text.textId === idtext))
    const words = useAppSelector(state => selectWordsArrById(state, text?.wordsIds as string[]))
    const [usedWords, setUsedWords] = useState<AllWordsSorted[]>([])
    const wordsBack = (words: AllWordsSorted[]) => {
        setUsedWords(words)
    }

    return <div className={`${styleTW.containerWide} p-8`}>
        <div className= {`${styleTW.bottomBorder} md:flex md:items-center md:gap-12 mb-12 pb-6 md:pb-8`}>
            <h1 className={`${styleTW.title1} mb-4`}>{text?.title}</h1>
            <LineButton>
                <Link to={{pathname: `/texts/edit/${idtext}`}}>Edit</Link>
            </LineButton>
        </div>
       <div>
        <h2 className={`${styleTW.title2} ${styleTW.bottomBorder} pb-2 mb-2`}>Used words</h2>
            <ul className='list-disc'>
            {
                words?.map(w => <li key={w.wordId}>{firstCapitalLetter(w.word)}</li>)
            }
            </ul>
       </div>
        <div className='my-8'>
        <h2 className={`${styleTW.title2} ${styleTW.bottomBorder} pb-4 md:mb-4`}>Text</h2>
            {
                words && <TextHighlighter words={words as WordDb[]} text={text?.text as string} wordsBack={wordsBack}/>
            }
        </div>
    </div>;
}


export default SingleText;