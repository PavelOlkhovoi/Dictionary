import { Link, useParams } from "react-router-dom"
import { firstCapitalLetter } from '../../helpers/display';
import ShowMeanings from '../../components/wordsForm/singleWord/ShowMeanings';
import { styleTW } from '../../style';
import { useAppSelector } from '../../hooks/redux-hooks';
import Loading from '../../components/Loading';
import LineButton from "../../components/ui-elements/buttons/LineButton";

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
        <section className={styleTW.containerWide}>
            <div className='sm:flex gap-8 items-center border-b-2 py-4'>
                <h1 className={`${styleTW.title1} mb-2 w-3/5`}>{firstCapitalLetter(currentWord.word)}</h1>
               <div className="w-2/5 flex gap-4">
               <LineButton>
                    <Link to={{pathname: `/words/edit/${idword}`}}>Edit</Link>
                </LineButton>
                <LineButton color="red">
                    Delete
                </LineButton>
               </div>
            </div>
            {/* <dl className={styleTW.gridDl}>
                <dt>Level:</dt>
                <dd>{currentWord.level}</dd>
            </dl> */}
            <div className="sm:flex gap-8 items-center border-b-2 py-4 mt-8">
                <h2 className={`${styleTW.title2} w-3/5`}>Translation</h2>
                <div className="w-2/5">
                    <LineButton color="green">
                        <Link to={{pathname: `/words/edit/${idword}`}}><span className="text-green-500">+</span> Add new</Link>
                    </LineButton>
                </div>
            </div>
            <ShowMeanings meanings={currentWord.meaning} wordId={idword as string} fastMeaning={currentWord.fastMeaning}/>
            <div className="flex gap-8 items-center border-b-2 mt-10 pb-2">
                <div className="w-3/5 flex items-center">
                    <h2 className={`${styleTW.title2}`}>Tags</h2>
                    {
                        tags.map(t => <div key={t.tagId} className={`ml-5 ${styleTW.bageBlue}`}>{t.name}</div>)
                    }
                </div>
                <div className="w-2/5">
                    <LineButton color="green">
                        <Link to={{pathname: `/words/edit/${idword}`}}><span className="text-green-500">+</span> Add new</Link>
                    </LineButton>
                </div>
            </div>
            <div>
                <div className="flex gap-8 items-center border-b-2 mt-10 pb-2">
                    <h2 className={`${styleTW.title2} w-3/5`}>Examples</h2>
                    <div className="w-2/5">
                        <LineButton color="green">
                            <Link to={{pathname: `/words/edit/${idword}`}}><span className="text-green-500">+</span> Add new</Link>
                        </LineButton>
                    </div>
                </div>
                {
                    currentWord.examples && currentWord.examples.length !== 0 && currentWord.examples.map(ex => {
                        const row = (ex.example.length > 0) && <div key={ex.example} className='my-4 border-b-2 pb-3 flex items-center gap-8'>
                            <div className="w-3/5">
                                <p className="text-lg font-medium">{firstCapitalLetter(ex.example)}</p>
                                <p className="font-base">{firstCapitalLetter(ex.translation)}</p>
                            </div>
                            <div className="w-2/5 flex gap-4">
                            <LineButton>
                                <Link to={{pathname: `/words/edit/${idword}`}}>Edit</Link>
                            </LineButton>
                            <LineButton color="red">
                                Delete
                            </LineButton>
                            </div>
                        </div>

                        return row
                    })
                }
            </div>
        </section>
    );
}

export default Word;