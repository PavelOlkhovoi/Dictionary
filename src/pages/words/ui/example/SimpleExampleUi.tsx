import MyInput from "../../../../components/wordsForm/ui/MyInput";
import { ExampleForm } from "../../../types/word";
interface Props {
    example: ExampleForm
    setExample: (id: string, name: string, text: string) => void
}
const SimpleExampleUi = ({example, setExample}: Props) => {

    const handleValue = (name: string, value: string) => {
        
        setExample(example.id, name, value)
    }
    return (
        <div className="my-2">
            <MyInput name="example" label="example" value={example.example} onChange={(e) => handleValue(e.target.name, e.target.value)}/>
            <MyInput name="translation" label="translation" value={example.translation} onChange={(e) => handleValue(e.target.name, e.target.value)}/>
        </div>
    )
}


export default SimpleExampleUi;