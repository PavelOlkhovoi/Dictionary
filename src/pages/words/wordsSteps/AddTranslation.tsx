import CardStepsWords from "./CardStepsWords";

interface Props {
    step: number
    changeStep: React.Dispatch<React.SetStateAction<number>>
}

const AddTranslation = ({step, changeStep}:Props) => {
    if (step !== 2){
        return null
    }
    return (
        <CardStepsWords step={2} fieldSet={<h1>1 Translation</h1>} changeStep={changeStep}/>
    )
}

export default AddTranslation;