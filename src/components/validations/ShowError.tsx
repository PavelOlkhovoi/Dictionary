import { ErrorStatus, } from "../../hooks/useValidation"


interface Props {
    show: boolean
    hookName: ErrorStatus
    length?: number
}

const ShowError = ({show, hookName, length}: Props) => {
    if(!show){
        return null
    }

    return <div className='	font-size'>

        {
            hookName.isEmpty && hookName.patternNames.includes('isEmpty') && 
            <p className='text-red-600'>*Empty field</p>
        }
        {
            !hookName.minLengthError && hookName.patternNames.includes('minLength') && 
            <p className='text-red-600'>*Length should be more then {length} letters</p>
        }
        {
            !hookName.uniqueTextError && hookName.patternNames.includes('isTextUnique') &&
            <p className='text-red-600'>*This name has already exist</p>
        }
    </div>;
}

export default ShowError;