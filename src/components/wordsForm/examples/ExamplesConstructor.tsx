import {useState, useEffect} from 'react'
import AbstarctGroup from '../AbstarctGroup';
import { InputExamples } from '../../../pages/types/word';
import MyButton from '../ui/MyButton';

interface Props {
    attachExamples: Function
}

const ExamplesConstructor = ({attachExamples}: Props) => {
    const entryExample: InputExamples = {
        example: '',
        translation: '',
        temId: new Date().getTime(),
    }

    const [examples, setExamples] = useState([entryExample])

    function addExample(){
        setExamples(prev => [ ...prev,
            {
                example: '',
                translation: '',
                temId: new Date().getTime(),
            }
        ])
    }  

        function deleteExample(example: InputExamples){
            const currentIdx = examples.indexOf(example)
            const pureArr = [...examples]

            pureArr.splice(currentIdx, 1)
    
            setExamples(pureArr)

            attachExamples(pureArr)
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

            attachExamples(pureArr)
        }

    return (
        <div>
            <AbstarctGroup 
                fieldsObject={examples} 
                typeOfField={'examples'}
                deleteField={deleteExample}
                saveField={saveField}
            />

            <div>
                <MyButton onClick={addExample}>Add new Example</MyButton>
            </div>
        </div>
    )
}


export default ExamplesConstructor;