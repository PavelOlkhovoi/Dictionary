import {useState} from 'react'


const useInput = (text: string) => {
    const [input, setInput] = useState(text)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    const inputProps = {
        value: input,
        onChange: handleChange
    }
    return inputProps
}


export default useInput;