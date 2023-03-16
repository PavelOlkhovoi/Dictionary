import CardStepsWords from "./CardStepsWords";

interface Props {
    step: number
    changeStep: React.Dispatch<React.SetStateAction<number>>
}

const AddTagsStep = ({step, changeStep}:Props) => {
    if (step !== 4){
        return null
    }
    return (
        <CardStepsWords step={4} fieldSet={<h1>Tags</h1>} changeStep={changeStep}/>
    )
}


export default AddTagsStep;