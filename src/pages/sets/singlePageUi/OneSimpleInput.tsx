import useValidation from "../../../hooks/useValidation"
import { Validations } from "../../../hooks/useValidation"
import MyInput from "../../../components/wordsForm/ui/MyInput"
import ShowError from "../../../components/validations/ShowError"
import {useState} from 'react'


interface Props {
    value: string
    wordId?: string | null
    valueHandle: Function
    pattern: Validations,
    name: string
    label: string
    customHook: (wordId: string, name: string, isValid: boolean) => void
}
const OneSimpleInput = ({value,  wordId, valueHandle, pattern, name, label, customHook}: Props) => {
    const valueValidation = useValidation(value, pattern)
    const [startValidate, setStartValidate] = useState(false)

    const cbHandle = (name: string, value: string) => {
        valueHandle(name, value, wordId)
    }

    const validateStartHandle = () => {
        setStartValidate(prev => true)
    }

    const validateStopHandle = (name: string) => {
        customHook(wordId as string, name, valueValidation.correctField)
        valueValidation.correctField &&
        setStartValidate(prev => false)
    }


    return  (
        <div>
            <MyInput 
            name={name}
            label={label}
            value={value}
            onFocus={validateStartHandle}
            onBlur={(e) => validateStopHandle(e.target.name)}
            onChange={(e) => cbHandle(e.target.name, e.target.value)}
            />
            <ShowError hookName={valueValidation} show={startValidate}/>
        </div>
    )
}



export default OneSimpleInput;