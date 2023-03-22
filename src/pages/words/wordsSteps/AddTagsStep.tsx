import CardStepsWords from "./CardStepsWords";
import { WordForm } from "./AddWordsWithSteps";
import ManageTags from "./uiFields/ManageTags";

interface Props {
    step: number
    changeStep: React.Dispatch<React.SetStateAction<number>>
    wordState: WordForm,
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>>
}

const AddTagsStep = ({step, changeStep, wordState, changeWordState}:Props) => {
    if (step !== 4){
        return null
    }
    return (
        <CardStepsWords step={4} fieldSet={<ManageTags wordState={wordState} changeWordState={changeWordState} />} changeStep={changeStep}/>
    )
}


export default AddTagsStep;