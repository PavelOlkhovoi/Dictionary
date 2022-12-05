import {useState, FC, useEffect, useRef} from 'react'
import { Meaning } from '../pages/types/word';
import MeaningInput from './MeaningInput';


interface Props {
  addMeaningObjToCover: Function,
  lastState: Meaning[]
}

// TODO: Delete Input by the delete button

const MeaningsObjectsCreator: FC<Props> = ({addMeaningObjToCover, lastState}) => {
  
  const [meaningsArr, setMeaningsArr] = useState<string[]>([])
  const [tempId, setTempIdx] = useState(new Date().getTime())
  const [objFinal, setObjFinal] = useState<Meaning>({
    tempId
  })
  
  const saveSingleMeaningToArr = (word: string) => {
    setMeaningsArr(prev => [...prev, word])
  }
  const [partOfSpeech, setPartOfSpeech] = useState('nothing')

  const deleteMeaning = (meaning: string) => {
    const newArr = meaningsArr.filter(m => m !== meaning)
    setMeaningsArr(newArr)
  }

  const [meaning, setMeaning] = useState([
    <MeaningInput 
      saveSingleMeaning={saveSingleMeaningToArr}
      deleteMeanning={deleteMeaning}
    />
  ])
  
  

  const buildMeaningArrWithPartOfSpeech = () => {
    const builtObject: Meaning = {
      tempId,
      [partOfSpeech]: meaningsArr
    }

    setObjFinal(builtObject)
    addMeaningObjToCover(builtObject, lastState)
  }

  useEffect(()=> {
    console.log(meaningsArr)
  }, [meaningsArr])


  // useEffect(()=> {
  //   console.log(objFinal)
  // }, [objFinal])


    return (
      <div>
        <hr />
            <input 
              value={partOfSpeech} 
              onChange={(e) => setPartOfSpeech(e.target.value)}
              />
            {
              meaning.map((inputField, idx) => 
                <div key={idx}>{inputField}</div>
              )
            }

            <button 
              onClick={()=> setMeaning(prev => [
                ...prev, 
                <MeaningInput 
                  saveSingleMeaning={saveSingleMeaningToArr}
                  deleteMeanning={deleteMeaning}
                />
              ])}
            >
              Add meaning fields
            </button>

            <button onClick={buildMeaningArrWithPartOfSpeech}>Save group</button>
        <hr/>
    </div>
  )

}

export default MeaningsObjectsCreator;