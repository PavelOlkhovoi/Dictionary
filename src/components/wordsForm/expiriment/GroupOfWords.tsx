import SingleWord from "./SingleWord";
import { FC } from "react";
import { ISingleWord } from "../../../pages/types/word";


interface Props {
    allWords: ISingleWord[],
    deleteTag: Function,
    saveTag: Function,
    title: string
}

const GroupOfWords: FC<Props> = ({allWords, deleteTag, saveTag, title}) => {

    const rows: JSX.Element[] = []

    allWords.forEach(tag => {
        rows.push(
            <SingleWord 
            key={tag.temId} 
            wordData={tag} 
            deleteField={deleteTag} 
            saveField={saveTag} 
            place={'tag'}
            />)
    })

    return (
        <div>
            <div>{title}</div>
            {rows}
        </div>
    )
}


export default GroupOfWords;