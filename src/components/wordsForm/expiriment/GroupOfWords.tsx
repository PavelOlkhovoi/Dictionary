import SingleWord from "./SingleWord";
import { FC } from "react";

export interface ISingleWord {
    name: string;
    temId: number;
    lastName: string;
    isDispaly: boolean
}

interface Props {
    allWords: ISingleWord[],
    deleteTag: Function
}

const GroupOfWords: FC<Props> = ({allWords, deleteTag}) => {

    const rows: JSX.Element[] = []

    allWords.forEach(tag => {
        if(tag.isDispaly){
            rows.push(<SingleWord key={tag.temId} wordData={tag} deleteTag={deleteTag}/>)
        }
    })

    return (
        <div>
            <div>Rows</div>
            {rows}
        </div>
    )
}


export default GroupOfWords;