import MyInput from "../../../../components/wordsForm/ui/MyInput";
import { WordForm } from "../AddWordsWithSteps";

interface Props {
    wordState: WordForm
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>> 
}

const FastMeaningFields = ({wordState, changeWordState}: Props) => {
    return (
        <div className="py-4">
            <MyInput name='word' label='word' value={wordState.word} onChange={(e)=> changeWordState(wState => ({
                ...wState,
                word: e.target.value
            }))}/>

            <MyInput name='fastMeaning' label='main meaning' value={wordState.fastMeaning} onChange={(e)=> changeWordState(wState => ({
                ...wState,
                fastMeaning: e.target.value
            }))}/>
        </div>
    )
}

export default FastMeaningFields;