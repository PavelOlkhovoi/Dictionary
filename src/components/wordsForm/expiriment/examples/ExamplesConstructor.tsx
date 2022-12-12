import {useState, useEffect} from 'react'
import AbstarctGroup from '../AbstarctGroup';
import { InputExamples } from '../../../../pages/types/word';

const ExamplesConstructor = () => {
    const entryExample: InputExamples = {
        example: '',
        translation: '',
        temId: new Date().getTime(),
    }

    const [examples, setExamples] = useState([entryExample])

    function addTag(){
        setExamples(prev => [ ...prev,
            {
                example: '',
                translation: '',
                temId: new Date().getTime(),
            }
        ])
    }  

        // TODO: Write helpers functions to manipulate It
        function deleteExample(example: InputExamples){
            const currentIdx = examples.indexOf(example)
            const pureArr = [...examples]

            pureArr.splice(currentIdx, 1)
    
            setExamples(pureArr)
        }

        function saveField(example: InputExamples, newExample: string, newTranslation: string){
            const currentIdx = examples.indexOf(example)
            const pureArr = [...examples]

            pureArr[currentIdx] = {
                ...example,
                example: newExample,
                translation: newTranslation
            }

            setExamples(pureArr)
        }
    
        useEffect(() => {
            console.log('Ex Constr', examples)
            

        }, [examples])

    return (
        <>
            <AbstarctGroup 
                fieldsObject={examples} 
                typeOfField={'examples'}
                deleteField={deleteExample}
                saveField={saveField}
            />

            <button onClick={addTag}>Add new Example</button>
        </>
    )
}


export default ExamplesConstructor;