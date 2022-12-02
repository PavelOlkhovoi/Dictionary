import {useState} from 'react'


const useTest = (s: string) => {
    const [input, setInput] = useState(s)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    const inputProps = {
        value: input,
        onChange: handleChange
    }
    return inputProps
}


export default useTest;