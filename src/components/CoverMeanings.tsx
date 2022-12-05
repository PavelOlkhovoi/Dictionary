import {useState, useEffect, FC} from 'react'
import { Meaning } from '../pages/types/word';
import MeaningsObjectsCreator from "./MeaningsObjectsCreator";

interface Props {
    meaningsForAddWord: React.Dispatch<React.SetStateAction<Meaning[]>>,
    deleteMeanning: Function,
}

const CoverMeanings: FC<Props> = ({meaningsForAddWord, deleteMeanning}) => {

    const [partsOfSpeechArray, setPartsOfSpeechArray] = useState<Meaning[]>([])
    
    const handleMeaningsObject = (obj: Meaning) => {

        setPartsOfSpeechArray(prev => {
            const isNew = prev.map(el => el.tempId).includes(obj.tempId)
            if(isNew) {
                const targetObj = prev.filter(el => el.tempId === obj.tempId)
                const idxMean = prev.indexOf(targetObj[0])
                console.log("inside Prev", idxMean)
                const copyPrev = [...prev]
                copyPrev[idxMean] = obj
                return copyPrev
            }
 

            return [...prev, obj]
        })
    }

    const [partsComponents, setPartsComponents] = useState(
        [<MeaningsObjectsCreator addMeaningObjToCover={handleMeaningsObject}
            lastState={partsOfSpeechArray}
        />
    ])

    useEffect(()=> {
        console.log('PartOfSp', partsOfSpeechArray)
      }, [partsOfSpeechArray])

    return (
       <div>
         {
            partsComponents.map((p, idx) => <div key={idx}>{p}</div>)
        }

        <button onClick={() => setPartsComponents(p => [
            ...p, 
            <MeaningsObjectsCreator 
                addMeaningObjToCover={handleMeaningsObject}
                lastState={partsOfSpeechArray}
            />])}
            >
                Add meanings
            </button>
       </div>
    );
}



export default CoverMeanings;