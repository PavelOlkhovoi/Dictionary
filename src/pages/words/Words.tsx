import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import {useEffect} from 'react'
import { styleTW } from '../../style';
import { firstCapitalLetter } from '../../helpers/display';
import { formatDistanceToNow, parseISO } from 'date-fns';
import LineButton from '../../components/ui-elements/buttons\'/LineButton';

const Words = () => {
    const words = useAppSelector(state => state.word.words)
        
    return (
        <div className={styleTW.containerWide}>
            <h1 className={`${styleTW.title1}`}>Words</h1>
            <div className='md:flex gap-20 mt-12'>
                <div className='sm:w-full md:w-5/12'>
                    <h2 className={`${styleTW.title2}`}>Space repetition</h2>
                    <div className='mt-4'>
                        <div className={`${styleTW.bottomBorder} py-2`}>
                        <Link to="/exercises/1" className='flex gap-8 items-center'>
                            <div className='w-3/5'>Repeat for the first time</div>
                            <div className='text-sm w-1/5'>20 words</div>
                            <div className='w-1/5 flex justify-end'><LineButton>Start</LineButton></div>
                        </Link>
                        </div>
                        <li className={`${styleTW.bottomBorder} py-2`}><Link to="/exercises/2">Second repetition</Link></li>
                        <li className={`${styleTW.bottomBorder} py-2`}><Link to="/exercises/3">Third repetition</Link></li>
                        <li className={`${styleTW.bottomBorder} py-2`}><Link to="/exercises/4">Fourth repetition</Link></li>
                        <li className={`${styleTW.bottomBorder} py-2`}><Link to="/exercises/5">Repeat for the first time</Link></li>
                        <li className={`${styleTW.bottomBorder} py-2`}><Link to="/exercises/6">Sixth repetition</Link></li>
                        <li className={`${styleTW.bottomBorder} py-2`}><Link to="/exercises/7">Seventh repetition</Link></li>
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