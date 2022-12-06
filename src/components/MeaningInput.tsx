import {FC} from 'react'
import useInput from "../hooks/useInput"


interface Props {
    saveSingleMeaning: Function,
    deleteMeanning: Function,
}

const MeaningInput: FC<Props> = ({saveSingleMeaning, deleteMeanning}) => {
    const {value, setInput, onChange} = useInput('')
    const deleteMeaning = () => {
        deleteMeanning(value)
        setInput('')
    }

    return (
        <div>
            <input type="text" value={value} onChange={onChange} />
            <button onClick={()=> saveSingleMeaning(value)}>Save</button>
            <button onClick={deleteMeaning}>Delete field</button>
        </div>
    );
}


export default MeaningInput;