import {useState, useEffect, FC} from 'react'
import MeaningsObjectsCreator from "./MeaningsObjectsCreator";

interface Props {
    meaningsForAddWord: React.Dispatch<React.SetStateAction<object[]>>
}

const CoverMeanings: FC<Props> = ({meaningsForAddWord}) => {
    const handleMeaningsObject = (obj: object) => {
        setPartsArray(prev => [...prev, obj])
    }

    const [partsComponents, setPartsComponents] = useState([<MeaningsObjectsCreator addMeaningObjToCover={handleMeaningsObject}/>])

    const [partsArray, setPartsArray] = useState<object[]>([])

    useEffect(() => {
        meaningsForAddWord(partsArray)
    }, [partsArray])


    return (
       <div>
         {
            partsComponents.map((p, idx) => <div key={idx}>{p}</div>)
        }

        <button onClick={() => setPartsComponents(p => [...p, <MeaningsObjectsCreator addMeaningObjToCover={handleMeaningsObject}/>])}>Add meanings</button>
       </div>
    );
}



export default CoverMeanings;