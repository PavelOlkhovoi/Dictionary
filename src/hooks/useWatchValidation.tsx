import {useEffect, useState} from 'react'

interface ErrorWatcher {
    id: string
    word?: boolean
    translation?: boolean
}

const useWatchValidation = () => {
    const [errorsWatcher, setErrorWatcher] = useState<ErrorWatcher[]>([])
    const [checkResult, setCheckResult] = useState(false)

    const handleFields = (id: string, fieldsName: string, isValid: boolean) => {
        const errorItem = errorsWatcher.find(er => er.id === id)
        
        if(errorItem){
            const updateState = errorsWatcher.map(item => {
                if(id === item.id){ 
                     if(fieldsName === 'word') {
                        item.word = isValid
                     }else {
                        item.translation = isValid
                     }
                }
                return item
            })

            setErrorWatcher(prev => updateState)
        }else {
            setErrorWatcher(prev => [...prev, { 
                id, 
                word: fieldsName === 'word' ? isValid : false,  
                translation: fieldsName === 'translation' ? isValid : false
            }])
        }
    }

    useEffect(()=> {
        if(errorsWatcher.length > 0){
            const res = errorsWatcher.every(er => er.word && er.translation)
            setCheckResult(prev => res)
        }
       
    }, [errorsWatcher])

    
    return {
        allErrord: errorsWatcher,
        handleFields,
        checkResult
    }
}

export default useWatchValidation
