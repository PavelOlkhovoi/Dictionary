import {useState, FC} from 'react'

interface Props {
    onBlur: Function
}

const MeaningInput: FC<Props> = ({onBlur}) => {
    const [meaning, setClosedMeaning] = useState('')
    return (
        <div>
            <input 
                type="text" 
                onChange={(e)=> setClosedMeaning(e.target.value)} 
                onBlur={(e) => onBlur(e)}
                value={meaning}
                placeholder="meaning"
            />
        </div>
    );
}


export default MeaningInput;