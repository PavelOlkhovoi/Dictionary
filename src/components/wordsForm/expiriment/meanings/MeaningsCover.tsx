import MeaningsConstructor from "./MeaningsConstructor";
import {useState} from 'react'
import { Meaning } from "../../../../pages/types/word";


const MeaningsCover = () => {
    const [meanIdx, setMeanIdx] = useState<Meaning[]>([{
        tempId: new Date().getTime()
    }])

    const idx = meanIdx.length-1


    return <MeaningsConstructor idx={idx}/>;
}


export default MeaningsCover;