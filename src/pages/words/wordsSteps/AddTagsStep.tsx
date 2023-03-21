import CardStepsWords from "./CardStepsWords";
import AllTagsBar from "./uiFields/AllTagsBar";
import ManageTags from "./uiFields/ManageTags";

interface Props {
    step: number
    changeStep: React.Dispatch<React.SetStateAction<number>>
}

const AddTagsStep = ({step, changeStep}:Props) => {
    if (step !== 4){
        return null
    }
    return (
        <CardStepsWords step={4} fieldSet={<ManageTags />} changeStep={changeStep}/>
    )
}


export default AddTagsStep;