import {FC} from 'react'
import { IExamples } from './ExamplesConstructor';
import SingleExample from './SingleExample';

interface Props {
    allExamples: IExamples[],
    deleteExample: Function
}

const GroupOfExamples: FC<Props> = ({allExamples, deleteExample}) => {
    const row: JSX.Element[] = []

    allExamples.forEach(example => {
        if(example.isDisplay){
            row.push(
                <SingleExample 
                key={example.temId}
                deleteField={deleteExample}
                fieldObject={example}
                />
            )
        }
    })
    return (
        <>
            {row}
        </>
    );
}


export default GroupOfExamples;