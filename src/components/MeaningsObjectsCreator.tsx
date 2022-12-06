import {useState, FC, useEffect} from 'react'
import { Meaning } from '../pages/types/word';
import MeaningInput from './MeaningInput';


interface Props {
  addMeaningObjToCover: Function,
}

// TODO: Delete Input by the delete button

const MeaningsObjectsCreator: FC<Props> = ({addMeaningObjToCover}) => {
  
  const [meaningsArr, setMeaningsArr] = useState<string[]>([])
  const [tempId, setTempIdx] = useState(new Date().getTime())
  const [objFinal, setObjFinal] = useState<Meaning>({tempId})
  
  const [partOfSpeech, setPartOfSpeech] = useState('nothing')

  const singleMeaning = <MeaningInput 
  saveSingleMeaning={saveSingleMeaningToArr}
  deleteMeanning={deleteMeaning}
  />


  const [meaning, setMeaning] = useState([singleMeaning])
  
  function saveSingleMeaningToArr(word: string){
    setMeaningsArr(prev => [...prev, word])
  }
  function deleteMeaning(meaning: string){
    setMeaningsArr(prev => prev.filter(m => m !== meaning))
  }

  const buildMeaningArrWithPartOfSpeech = () => {
    const builtObject: Meaning = {
      tempId,
      [partOfSpeech]: meaningsArr
    }

    setObjFinal(builtObject)
    addMeaningObjToCover(builtObject)
  }

  useEffect(()=> {
    console.log(meaningsArr)
  }, [meaningsArr])



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
              onClick={()=> setMeaning(prev => [...prev, singleMeaning])}>
              Add meaning fields
            </button>

            <button onClick={buildMeaningArrWithPartOfSpeech}>Save group</button>
        <hr/>
    </div>
  )

}

export default MeaningsObjectsCreator;