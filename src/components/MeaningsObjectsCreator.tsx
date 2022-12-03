import {useState, FC, useEffect} from 'react'
import MeaningInput from './MeaningInput';
import useInput from '../hooks/useInput';


interface Props {
  addMeaningObjToCover: Function
}

const MeaningsObjectsCreator: FC<Props> = ({addMeaningObjToCover}) => {
  const [meaningsArr, setMeaningsArr] = useState<string[]>([])
  
  const saveWhenInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setMeaningsArr(prev => [...prev, e.target.value])
  }

  const [meaning, setMeaning] = useState([<MeaningInput onBlur={saveWhenInputBlur}/>])
  
  
  const partOfSpeech = useInput('nothing')

  const buildMeaningArrWithPartOfSpeech = () => {
    const builtObject = {
      [partOfSpeech.value]: meaningsArr
    }
    addMeaningObjToCover(builtObject)
  }


    return (
      <div>
        <hr />
            <input {...partOfSpeech}/>
            {
              meaning.map((inputField, idx) => 
                <div key={idx}>{inputField}</div>
              )
            }

            <button 
              onClick={()=> setMeaning(prev => [...prev, <MeaningInput onBlur={saveWhenInputBlur}/>])}
            >
              Add meanings
            </button>

            <button onClick={buildMeaningArrWithPartOfSpeech}>Save value</button>
        <hr/>
    </div>
  )

}

export default MeaningsObjectsCreator;