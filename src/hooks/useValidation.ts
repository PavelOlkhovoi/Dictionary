import {useEffect, useState} from 'react'

export interface Validations {
    minLength?: number
    isEmpty?: boolean
} 

const useValidation = (value: string, validations: Validations) => {
    const [isEmpty, setIsEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [correctField, setCorrectField] = useState(false)
    useEffect(()=> {
        for (const validation in validations){
            switch(validation){
                case 'minLength': 
                value.length < (validations.minLength as number) ? setMinLengthError(false) : setMinLengthError(true)
                break;
                case 'isEmpty':
                value ? setIsEmpty(false) : setIsEmpty(true)
                break;
            }
        }

    }, [value])

    useEffect(()=> {
        if(isEmpty || !minLengthError) {
            setCorrectField(false)
        }else {
            setCorrectField(true)
        }
    }, [isEmpty, minLengthError])
    
    return {
        isEmpty,
        minLengthError,
        correctField
    };
}


export default useValidation;