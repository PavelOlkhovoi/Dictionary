import CardStepsWords from "./CardStepsWords";

interface Props {
    step: number
}
const FastMeaning = ({step}:Props) => {
    return (
        <CardStepsWords step={step} fieldSet={<h1>Главное мнение</h1>} />
    )
}

export default FastMeaning;