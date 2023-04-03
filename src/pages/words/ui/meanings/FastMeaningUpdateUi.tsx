import MyInput from "../../../../components/wordsForm/ui/MyInput";
interface Props {
    value: string
    changeValue: (text: string) => void
    sendToDb: () => void
    fireValidation: () => void
}
const FastMeaningUpdateUi = ({value, changeValue, sendToDb, fireValidation}: Props) => {
    return (
        <div className="w-full my-1 relative">
                <MyInput
                label="meaning"   
                name="meaning"
                value={value}
                onChange={(e) => changeValue(e.target.value)}  
                onBlur={sendToDb} 
                onFocus={fireValidation}
                />
        </div>
    )
}

export default FastMeaningUpdateUi;