import CardStepsWords from "./CardStepsWords";
import { WordForm } from "./AddWordsWithSteps";
import ExamplesFields from "./uiFields/ExamplesFields";

interface Props {
    step: number
    changeStep: React.Dispatch<React.SetStateAction<number>>,
    wordState: WordForm,
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>>
}

const AddExamples = ({step, changeStep, wordState, changeWordState}: Props) => {
    const errorless = wordState.validFields.word && wordState.validFields.meaning
    if (step !== 3){
        return null
    }
    return (
        <CardStepsWords 
        step={3} 
        fieldSet={
            <ExamplesFields wordState={wordState} changeWordState={changeWordState} />
        } 
        changeStep={changeStep}
        changeWordState={changeWordState}
        errorless={errorless}
        />
    )
}

export default AddExamples;