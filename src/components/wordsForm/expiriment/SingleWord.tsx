import {FC} from 'react'
import { ISingleWord } from './GroupOfWords';

interface Props {
    wordData: ISingleWord,
    deleteTag: Function
}

const SingleWord: FC<Props> = ({wordData, deleteTag}) => {
    return (
        <div>
            <input placeholder="tag"/>
            <button>Save / Update</button>
            <button onClick={() => deleteTag(wordData)}>Delete</button>
        </div>
    );
}

export default SingleWord;
