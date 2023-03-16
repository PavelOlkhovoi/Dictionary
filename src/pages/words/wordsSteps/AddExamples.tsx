import CardStepsWords from "./CardStepsWords";

interface Props {
    step: number
    changeStep: React.Dispatch<React.SetStateAction<number>>
}

const AddExamples = ({step, changeStep}: Props) => {
    if (step !== 3){
        return null
    }
    return (
        <CardStepsWords step={3} fieldSet={<h1>Examples</h1>} changeStep={changeStep}/>
    )
}

export default AddExamples;