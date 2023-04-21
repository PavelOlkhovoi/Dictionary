import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { styleTW } from '../../style';
import LineButton from '../../components/ui-elements/buttons/LineButton';
import useExerciseSpaceWords from '../../hooks/useExerciseWords';
import SpaceRepetitionPreview from '../../components/exercise/SpaceRepetitionPreview';
import SortedWordsPrew from './preview/SortedWordsPrew';

const Words = () => {
    const words = useAppSelector(state => state.word.words)
    const spaceRepetition = useExerciseSpaceWords()
    return (
        <div className={styleTW.containerWide}>
            <div className='flex gap-4 justify-between items-center'>
            <h1 className={`${styleTW.title1}`}>Words</h1>
            <LineButton>
                <Link to="addwordsSteps">Add word</Link>
            </LineButton>
            </div>
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

                <div className='sm:w-full md:w-6/12 mt-12 md:mt-0 pb-20'>
                    <h2 className={`${styleTW.title2}`}>7 last added words</h2>
                    <div className='mt-4'>
                    <SortedWordsPrew words={words} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Words;