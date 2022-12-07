import {useState, useEffect} from 'react'
import { IExample } from '../../pages/types/word';
import Example from './Example';
import { copyAndUpdateArrByIndex, isElementInArr } from '../../helpers/manipulateArr';

const ExamplesCreator = () => {
    const [examples, setExamples] = useState<IExample[]>([])
    
    const exampleComponent = <Example save={saveExample} deleteExample={deleteExample}/>
    const [componentsArr, setComponentsArr] = useState([exampleComponent])

    
    function saveExample(example: IExample){
        setExamples(prev => {
            const arrIindex = isElementInArr(prev, example.temId)
            console.log('Test arrIndex', arrIindex)
            if(arrIindex === -1){
                return [...prev, example] 
            }
            return copyAndUpdateArrByIndex(prev, arrIindex, example)
        })
    }


    function deleteExample(example: IExample){
        setExamples(prev => prev.filter(ex => ex.temId !== example.temId))
    }

    
    useEffect(() => {
        console.log(examples)
    }, [examples])
    return <div>
        {
            componentsArr.map((c, idx) => <div key={idx}>{c}</div>)
        }
        <button onClick={() => setComponentsArr(prev => [...prev, exampleComponent])}>Add example</button>
    </div>;
}


export default ExamplesCreator;