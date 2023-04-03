import MyInput from "../../../components/wordsForm/ui/MyInput";
interface Props {
    value: string
    changeValue: (text: string) => void
    sendToDb: () => void
    fireValidation: () => void
    name: string
}
const OneInputUi = ({value, name, changeValue, sendToDb, fireValidation}: Props) => {
    return (
        <div className="w-full my-1 relative">
                <MyInput
                label={name}   
                name={name}
                value={value}
                onChange={(e) => changeValue(e.target.value)}  
                onBlur={sendToDb} 
                onFocus={fireValidation}
                />
        </div>
    )
}

export default OneInputUi;