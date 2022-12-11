import {useState} from 'react'
import GroupOfExamples from './groupOfExamples';


export interface IExamples {
    example: string;
    translation: string;
    temId: number;
    isDisplay: boolean
}


const ExamplesConstructor = () => {
    const entryExample: IExamples = {
        example: '',
        translation: '',
        temId: new Date().getTime(),
        isDisplay: true
    }
    const [examples, setExamples] = useState([entryExample])

    function addTag(){
        setExamples(prev => [ ...prev,
            {
                example: '',
                translation: '',
                temId: new Date().getTime(),
                isDisplay: true
            }
        ])
    }  

        // TODO: Write helpers functions to manipulate It
        function deleteExample(example: IExamples){
            const currentTagIdx = examples.indexOf(example)
            const puereArr = [...examples]
            puereArr[currentTagIdx] = {
                ...example,
                isDisplay: false
            }
    
            setExamples(puereArr)
        }  
    

    return (
        <>
            <GroupOfExamples
            allExamples={examples} 
            deleteExample={deleteExample}
            />

            <button onClick={addTag}>Add new Example</button>
        </>
    )
}


export default ExamplesConstructor;