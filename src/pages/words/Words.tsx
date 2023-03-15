import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { styleTW } from '../../style';
import { firstCapitalLetter } from '../../helpers/display';
import { formatDistanceToNow, parseISO } from 'date-fns';
import LineButton from '../../components/ui-elements/buttons/LineButton';
import useExerciseSpaceWords from '../../hooks/useExerciseWords';
import SpaceRepetitionPreview from '../../components/exercise/SpaceRepetitionPreview';

const Words = () => {
    const words = useAppSelector(state => state.word.words)
    const spaceRepetition = useExerciseSpaceWords()
    return (
        <div className={styleTW.containerWide}>
            <h1 className={`${styleTW.title1}`}>Words</h1>
            <div className='md:flex gap-20 mt-12'>
                <div className='sm:w-full md:w-5/12'>
                    <h2 className={`${styleTW.title2}`}>Space repetition</h2>
                    <div className='mt-4'>
                        <SpaceRepetitionPreview step={1} title="Firest repetition" numberOfWords={spaceRepetition.first}/>
                        <SpaceRepetitionPreview step={2} title="Second repetition" numberOfWords={spaceRepetition.second}/>
                        <SpaceRepetitionPreview step={3} title="Third repetition" numberOfWords={spaceRepetition.third}/>
                        <SpaceRepetitionPreview step={4} title="Fourth repetition" numberOfWords={spaceRepetition.forth}/>
                        <SpaceRepetitionPreview step={5} title="Fifth repetition" numberOfWords={spaceRepetition.fifth}/>
                        <SpaceRepetitionPreview step={6} title="Sixth repetition" numberOfWords={spaceRepetition.sixth}/>
                        <SpaceRepetitionPreview step={7} title="Seventh repetition" numberOfWords={spaceRepetition.seventh}/>
                    </div>
                </div>

                <div className='sm:w-full md:w-6/12 mt-12 md:mt-0'>
                    <h2 className={`${styleTW.title2}`}>20 last added words</h2>
                    <div className='mt-4'>
                    {
                        words.map(w => 
                        <div 
                        key={w.wordId}
                        className={`${styleTW.bottomBorder} py-2 flex gap-8 items-center`}
                        >
                            <div className='w-2/5'>
                                <Link to={{pathname: `/words/${w.wordId}`}}>
                                    {firstCapitalLetter(w.word)}
                                </Link>
                            </div>
                            <div className='flex-grow text-sm w-2/5'>
                                {formatDistanceToNow(parseISO(w.createdAt as string), {addSuffix: true})}
                            </div>
                            <div className='w-1/5 flex justify-end'>
                                <LineButton>Open</LineButton>
                            </div>
                        </div>)
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Words;