import { ReactNode, useState } from "react";
import { styleTW } from "../../../style";
import AddExamples from "./AddExamples";
import AddTagsStep from "./AddTagsStep";
import AddTranslation from "./AddTranslation";
import FastMeaning from "./FastMeaning";

interface Props {
    
}
const AddWordsWithSteps = ({ }: Props) => {
    const [step, setStep] = useState(2)
    return (
        <div>
            <FastMeaning step={step} changeStep={setStep} />
            <AddTranslation step={step} changeStep={setStep} />
            <AddExamples step={step} changeStep={setStep} />
            <AddTagsStep step={step} changeStep={setStep} />
        </div>
    )
}


export default AddWordsWithSteps;