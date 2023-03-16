import CardStepsWords from "./CardStepsWords";

interface Props {
    step: number
    changeStep: React.Dispatch<React.SetStateAction<number>>
}
const FastMeaning = ({step, changeStep}:Props) => {
    if (step !== 1){
        return null
    }
    return (
        <CardStepsWords step={step} fieldSet={<h1>Главное мнение</h1>} changeStep={changeStep}/>
    )
}

export default FastMeaning;