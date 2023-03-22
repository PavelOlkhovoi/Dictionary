import {useEffect, useState} from 'react'

export interface Validations {
    minLength?: number
    isEmpty?: boolean
    isTextUnique?: string[]
} 

const useValidation = (value: string, validations: Validations, textArr?: string[]) => {
    const [isEmpty, setIsEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [uniqueTextError, setUniqueTextError] = useState(false)
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
                case 'isTextUnique':
                textArr?.map(t => t.toLocaleUpperCase().trim()).includes(value.toLocaleUpperCase().trim()) ? setUniqueTextError(false) : setUniqueTextError(true)
                break;
            }
        }

    }, [value])

    useEffect(()=> {
        if(isEmpty || !minLengthError || !uniqueTextError) {
            setCorrectField(false)
        }else {
            setCorrectField(true)
        }
    }, [isEmpty, minLengthError, uniqueTextError])
    
    return {
        isEmpty,
        minLengthError,
        uniqueTextError,
        correctField
    };
}


export default useValidation;