import { type } from "os"
import { ErrorStatus, } from "../../hooks/useValidation"


interface Props {
    show: boolean
    pattern: ErrorStatus
    length?: number
}

const ShowError = ({show, pattern, length}: Props) => {
    if(!show){
        return null
    }

    return <div className='	font-size'>
        {
            pattern.isEmpty && pattern.patterns.includes('isEmpty') && 
            <p className='text-red-600'>*Empty field</p>
        }
        {
            !pattern.minLengthError && pattern.patterns.includes('minLength') && 
            <p className='text-red-600'>*Length should be more then {length} letters</p>
        }
        {
            !pattern.uniqueTextError && pattern.patterns.includes('isTextUnique') &&
            <p className='text-red-600'>*This name has already exist</p>
        }
    </div>;
}

export default ShowError;