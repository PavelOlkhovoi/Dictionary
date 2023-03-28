import CardStepsWords from "./CardStepsWords";
import { WordForm } from "./AddWordsWithSteps";
import TranslationGroup from "./uiFields/TranslationGroup";

interface Props {
    step: number
    changeStep: React.Dispatch<React.SetStateAction<number>>
    wordState: WordForm
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>> 
}

const AddTranslation = ({step, changeStep, wordState, changeWordState}:Props) => {
    const errorless = wordState.validFields.word && wordState.validFields.meaning
    if (step !== 2){
        return null
    }
    return (
        <CardStepsWords 
        step={2} 
        changeStep={changeStep} 
        fieldSet={
        <TranslationGroup changeWordState={changeWordState} wordState={wordState}/>}   
        changeWordState={changeWordState}
        errorless={errorless}
        />
    )
}

export default AddTranslation;