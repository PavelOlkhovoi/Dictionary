import { useEffect } from 'react';
import useValidation, { Validations } from '../../hooks/useValidation';

interface Props {
    value: string,
    pattern: Validations
    isFormReady?: Function
    show: boolean
}
const Validate = ({value, pattern, isFormReady = () => null, show}: Props) => {
    const validate = useValidation(value, pattern)
    
    useEffect(()=> {
        isFormReady(validate.correctField)
    }, [])

    if(!show){
        return null
    }

    return <div className='	font-size'>
        {
            (validate.isEmpty && pattern.isEmpty) && 
            <p className='text-red-600'>*Empty field</p>
        }
        {
            (!validate.minLengthError &&  pattern.minLength) &&
            <p className='text-red-600'>*Length should be more then {pattern.minLength} letters</p>
        }
        {
            (!validate.uniqueTextError && pattern.isTextUnique) && 
            <p className='text-red-600'>*This name has already exist</p>
        }
    </div>;
}

export default Validate;