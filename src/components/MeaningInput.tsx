import {useState, FC} from 'react'

interface Props {
    onBlur: Function,
    onChange: Function
}

const MeaningInput: FC<Props> = ({onBlur, onChange}) => {
    const [meaning, setClosedMeaning] = useState('')
    return (
        <div>
            <input 
                type="text" 
                onChange={(e)=> onChange(e.target.value)} 
                onBlur={(e) => onBlur(e)}
                placeholder="meaning"
            />
        </div>
    );
}


export default MeaningInput;