import {useState, FC} from 'react'
import MeaningInput from './MeaningInput';


interface Props {
    setObject: Function
}

const MeaningsObjectsCreator: FC<Props> = ({setObject}) => {
    const [meaningArray, setMeaningArray] = useState<string[]>([])

    const [part, setPart] = useState('nothing')

    const meaningsHandle = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        e.preventDefault()
        const newMeaning = e.target.value
        newMeaning.length > 0 && setMeaningArray(prev => [...prev, e.target.value])
        setObject({[part]: meaningArray})
      }

    const [inputsArray, setInputsArray] = useState([<MeaningInput onBlur={meaningsHandle}/>])

    const addMeaningComponent = () => {
        setInputsArray(prev => [...prev, <MeaningInput onBlur={meaningsHandle}/>])
  
      }
    return <div>
        <hr />
                <div>
                  <input type='text' placeholder="part" value={part} onChange={(e)=> setPart(e.target.value)}/>
                </div>
                    {
                      inputsArray.map( (p, idx) => <div key={idx}>{p}</div>)
                    }
                    <button onClick={addMeaningComponent}>Add the meaning fields</button>
        <hr/>
    </div>;
}

export default MeaningsObjectsCreator;