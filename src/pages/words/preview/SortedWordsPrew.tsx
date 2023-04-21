import { firstCapitalLetter } from "../../../helpers/display";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { WordDb } from "../../../types/word";
import { styleTW } from "../../../style";
import { Link } from "react-router-dom";
import LineButton from "../../../components/ui-elements/buttons/LineButton";
import { useState } from "react";
import { PlusIcon } from '@heroicons/react/24/outline'

interface Props {
    words: WordDb[]
}

const SortedWordsPrew = ({words}:Props) => {
    const [visiblePosts, setVisiblePosts] = useState(7);

    const sortedArr =  [...words].sort((a, b)=> {
        return parseISO(b.createdAt as string).getTime() - parseISO(a.createdAt as string).getTime()
    })

    const handleLoadBtn = () => {
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 7);
      };


    return (
        <div>
            {
             sortedArr.slice(0, visiblePosts).map(w => 
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
                        <LineButton>
                            <Link to={{pathname: `/words/${w.wordId}`}}>
                                Open
                            </Link>
                        </LineButton>
                    </div>
                </div>)
            }

            <div
            className="cursor-pointer flex gap-3 items-center mt-6 hover:text-yellow-700 transition-opacity" 
            onClick={handleLoadBtn}
            >
                Load more
                <PlusIcon className="w-4 h-4 text-yellow-800 transition-opacity" />
            </div>
        </div>
    )
}

export default SortedWordsPrew;