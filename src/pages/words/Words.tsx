import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import {useEffect} from 'react'

const Words = () => {
    const words = useAppSelector(state => state.word.words)
        
    return (
        <div className='p-6 max-w-sm mx-auto'>
            <h1 className="text-3xl font-bold underline">All words</h1>
            <ul>
                {
                    words.map(w => 
                    <li 
                        key={w.wordId}
                        >
                        <Link 
                            to={{pathname: `/words/${w.wordId}`}}
                        >
                            {w.word}
                        </Link>
                    </li>)
                }
            </ul>
        </div>
    );
}

export default Words;