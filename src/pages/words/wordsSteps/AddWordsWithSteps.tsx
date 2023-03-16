import { ReactNode, useState } from "react";
import { styleTW } from "../../../style";
import AddExamples from "./AddExamples";
import AddTagsStep from "./AddTagsStep";
import AddTranslation from "./AddTranslation";
import FastMeaning from "./FastMeaning";

interface Props {
    
}
const AddWordsWithSteps = ({ }: Props) => {
    const [step, setStep] = useState(1)
    return (
        <div>
            <FastMeaning step={step} />
            <AddTranslation />
            <AddExamples />
            <AddTagsStep />
        </div>
    )
}


export default AddWordsWithSteps;