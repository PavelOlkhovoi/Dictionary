import {useState, useEffect, FC} from 'react'
import { Meaning } from '../pages/types/word';
import MeaningsObjectsCreator from "./MeaningsObjectsCreator";

interface Props {
    meaningsForAddWord: React.Dispatch<React.SetStateAction<Meaning[]>>,
    deleteMeanning: Function,
}

const CoverMeanings: FC<Props> = ({meaningsForAddWord, deleteMeanning}) => {
    
    const handleMeaningsObject = (obj: Meaning) => {
        setPartsOfSpeechArray(prev => [...prev, obj])
    }

    const [partsComponents, setPartsComponents] = useState(
        [<MeaningsObjectsCreator addMeaningObjToCover={handleMeaningsObject}
        />
    ])

    const [partsOfSpeechArray, setPartsOfSpeechArray] = useState<Meaning[]>([])

    // useEffect(() => {
    //     meaningsForAddWord(partsOfSpeechArray)
    // }, [partsOfSpeechArray])


    return (
       <div>
         {
            partsComponents.map((p, idx) => <div key={idx}>{p}</div>)
        }

        <button onClick={() => setPartsComponents(p => [
            ...p, 
            <MeaningsObjectsCreator 
                addMeaningObjToCover={handleMeaningsObject}
            />])}
            >
                Add meanings
            </button>
       </div>
    );
}



export default CoverMeanings;