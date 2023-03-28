import { Link, useParams } from "react-router-dom"
import { firstCapitalLetter } from '../../helpers/display';
import MyButton from '../../components/wordsForm/ui/MyButton';
import { styleTW } from '../../style';
import { useAppSelector } from '../../hooks/redux-hooks';
import Loading from '../../components/Loading';
import LineButton from "../../components/ui-elements/buttons/LineButton";
import { Meaning } from "../types/word";

const Word = () => {
    const { idword } = useParams()
    const currentWord = useAppSelector(state => state.word.words.find(w => w.wordId === idword))
    const wordStatus = useAppSelector(state => state.word.status)
    const tagStatus = useAppSelector(state => state.tag.status)
    const tags = useAppSelector(state => state.tag.tags.filter(tag => tag.word_id.includes(idword as string)))
    

    if( wordStatus === 'pending' || tagStatus === 'pending' || !currentWord ){
        return <Loading />
    }

    return (
        <section
        className={`${styleTW.containerWide}`}
        >
            <div className={`${styleTW.bottomBorder} md:flex md:items-center md:gap-12 mb-10 md:mb-12 pb-6`}>
                 <h1 className='text-6xl font-normal leading-normal mt-0 mb-2'>{firstCapitalLetter(currentWord.word)}</h1>
                
                <LineButton>
                    <Link to={{pathname: `/words/edit/${idword}`}}>Edit</Link>
                </LineButton>

            </div>
            {/* <dl className={styleTW.gridDl}>
                <dt>Level:</dt>
                <dd>{currentWord.level}</dd>
            </dl> */}
            <div>
                <h2 className={`${styleTW.title2} ${styleTW.bottomBorder} pb-2 mb-2`}>Meanings</h2>
                <ul>
                    <li>{currentWord.fastMeaning && currentWord.fastMeaning}</li>
                    {
                        Object.entries(currentWord.meaning).map(([key, value], idx) => {
                            const translation = value.translation.map((t, idx) => <span key={`${t}-${idx}`}>t</span>)

                            return <li key={`${key}-${idx}`}>
                            <h3>{key}</h3>
                            {
                                translation
                            }
                        </li>
                        })
                        
                    }
                </ul>
            </div>
            
            <div>
            <h2 className={styleTW.title2}>Examples</h2>
                {
                    currentWord.examples && currentWord.examples.length !== 0 && currentWord.examples.map(ex => {
                        return <div key={ex.example} className='my-4'>
                            <h3 className={styleTW.title3}>Example</h3>
                                <p> {ex.example}</p>
                            <h3 className={`${styleTW.title3} mt-2`}>Translation</h3>
                            <p>{ex.translation}</p>
                        </div>
                    })
                }
                {/* {
                    currentWord.examples && currentWord.examples.length !== 0 && isEdit && 
                    <EditExample allExamples={currentWord.examples} exampleUpdate={examplesUpdate}/>
                } */}
            </div>
            <div className='flex items-center'>
            <h2 className="my-4 text-4xl">Tags</h2>
                {
                    tags.map(t => <div key={t.tagId}><span className={`${styleTW.bageBlue} mt-3 ml-5`}>{t.name}</span></div>)
                }
            </div>
        </section>
    );
}

export default Word;