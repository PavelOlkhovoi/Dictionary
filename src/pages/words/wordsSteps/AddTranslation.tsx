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
    const errorless = wordState.validFields.word && wordState.validFields.fastMeaning
    if (step !== 2){
        return null
    }
    return (
        <CardStepsWords 
        step={2} 
        changeStep={changeStep} 
        fieldSet={
        <TranslationGroup changeWordState={changeWordState} wordState={wordState}/>}   
        errorless={errorless}
        />
    )
}

export default AddTranslation;