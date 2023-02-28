import React from 'react';
import useValidation, { Validations } from '../../hooks/useValidation';

interface Props {
    value: string,
    pattern: Validations
    isFormReady?: Function
    show: boolean
}
const Validate = ({value, pattern, isFormReady, show}: Props) => {
    const validate = useValidation(value, pattern)
   
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
    </div>;
}

export default Validate;