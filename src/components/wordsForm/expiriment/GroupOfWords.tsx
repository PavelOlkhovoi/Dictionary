import SingleWord from "./SingleWord";
import { FC } from "react";

export interface ISingleWord {
    name: string;
    temId: number;
    isDispaly: boolean
}

interface Props {
    allWords: ISingleWord[],
    deleteTag: Function,
    saveTag: Function,
    title: string
}

const GroupOfWords: FC<Props> = ({allWords, deleteTag, saveTag, title}) => {

    const rows: JSX.Element[] = []

    allWords.forEach(tag => {
        if(tag.isDispaly){
            rows.push(
            <SingleWord 
            key={tag.temId} 
            wordData={tag} 
            deleteField={deleteTag} 
            saveField={saveTag} 
            place={'tag'}
            />)
        }
    })

    return (
        <div>
            <div>{title}</div>
            {rows}
        </div>
    )
}


export default GroupOfWords;