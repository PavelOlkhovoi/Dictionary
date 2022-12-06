import {useState, useEffect, FC} from 'react'
import { Meaning } from '../pages/types/word';
import MeaningsObjectsCreator from "./MeaningsObjectsCreator";

interface Props {
    meaningsForAddWord: React.Dispatch<React.SetStateAction<Meaning[]>>,
    deleteMeanning: Function,
}

const CoverMeanings: FC<Props> = ({meaningsForAddWord, deleteMeanning}) => {

    const [partsOfSpeechArray, setPartsOfSpeechArray] = useState<Meaning[]>([])

    const meaningComponent = <MeaningsObjectsCreator addMeaningObjToCover={handleMeaningsObject}
    />

    const [partsComponents, setPartsComponents] = useState([meaningComponent])

    function handleMeaningsObject(obj: Meaning){

        //TODO: Refactor this code
        // refers https://beta.reactjs.org/learn/adding-interactivity

        setPartsOfSpeechArray(prev => {
            const isNew = prev.map(el => el.tempId).includes(obj.tempId)
            if(isNew) {
                const targetObj = prev.filter(el => el.tempId === obj.tempId)
                const idxMean = prev.indexOf(targetObj[0])
                const copyPrev = [...prev]
                copyPrev[idxMean] = obj
                // meaningsForAddWord(copyPrev)
                return copyPrev
            }

            // meaningsForAddWord([...prev, obj])
 
            return [...prev, obj]
        })

 
    }


    useEffect(()=> {
        meaningsForAddWord(partsOfSpeechArray)
      }, [partsOfSpeechArray])

    return (
       <div>
         {
            partsComponents.map((p, idx) => <div key={idx}>{p}</div>)
        }

            <button onClick={() => setPartsComponents(p => [...p, meaningComponent])}>
                Add meanings
            </button>
       </div>
    );
}



export default CoverMeanings;