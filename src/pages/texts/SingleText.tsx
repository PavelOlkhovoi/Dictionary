import {Link, useParams} from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectWordsArrById } from '../../store/slices/wordSlice';
import { styleTW } from '../../style';
import TextHighlighter from '../../components/text/TextHighlighter';
import { AllWordsSorted, WordDb } from '../../types/word';
import { useState } from 'react';
import LineButton from '../../components/ui-elements/buttons/LineButton';
import { firstCapitalLetter } from '../../helpers/display';
import TitleGrid from '../../components/ui-elements/grids/TitleGrid';


const SingleText = () => {
    const {idtext} = useParams()
    const text = useAppSelector(state => state.text.texts.find(text => text.textId === idtext))
    const words = useAppSelector(state => selectWordsArrById(state, text?.wordsIds as string[]))
    const [usedWords, setUsedWords] = useState<AllWordsSorted[]>([])
    const wordsBack = (words: AllWordsSorted[]) => {
        setUsedWords(words)
    }

    return <div className={`${styleTW.containerWide} p-8`}>

        <TitleGrid title={text?.title as string} typeOfTitle='h1'>
            <LineButton>
                <Link to={{pathname: `/texts/edit/${idtext}`}}>Edit</Link>
            </LineButton>
        </TitleGrid>

       <div>
        
        <TitleGrid title='Used words' typeOfTitle='h2' />
            <ul className='list-disc'>
            {
                words?.map(w => <li key={w.wordId}>{firstCapitalLetter(w.word)}</li>)
            }
            </ul>
       </div>
       
        <div className='my-8'>
        <TitleGrid title='Text' typeOfTitle='h2' />
            {
                words && <TextHighlighter words={words as WordDb[]} text={text?.text as string} wordsBack={wordsBack}/>
            }
        </div>
    </div>;
}


export default SingleText;