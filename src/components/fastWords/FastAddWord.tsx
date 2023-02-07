import {useState, useEffect} from 'react'
import { nanoid } from '@reduxjs/toolkit'
import MyButton from '../wordsForm/ui/MyButton'
import MyInput from '../wordsForm/ui/MyInput'
import { styleTW } from '../../style'

interface TestObj {
    [index: string]: TestT
}

interface TestT {
    name: string
    translation: string
    show: Boolean

}

const FastAddWord = () => {
const id = () => nanoid()
const [words, setWords] = useState<TestObj>({
    [id()]: {
        name: '',
        translation: '',
        show: true
    } 
})

useEffect(()=> {
    console.log('Wwww', words)
}, [words])

const idsArr = Object.keys(words)
    
    return (
        <div>
            {
                idsArr.map(w => words[w as keyof TestObj].show && <div key={w} className="mt-4 mb-8 p-12 shadow bg-white rounded-md">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                    Name
                    <input className={`${styleTW.shadow} w-full my-2`} value={words[w as keyof TestObj].name}
                    onChange={(e) => setWords(prev => ({
                        ...prev,
                        [w as keyof TestObj]: {
                            ...prev[w as keyof TestObj],
                            name: e.target.value
                        }
                    }))}
                    />
                    </label>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                    Translation
                    <input className={`${styleTW.shadow} w-full my-2`} value={words[w as keyof TestObj].translation}
                    onChange={(e) => setWords(prev => ({
                        ...prev,
                        [w as keyof TestObj]: {
                            ...prev[w as keyof TestObj],
                            translation: e.target.value
                        }
                    }))}
                    />
                    </label>
                    <MyButton
                    onClick={()=> setWords(prev => {
                        return ({
                            ...prev,
                            [w as keyof TestObj]: {
                                ...prev[w as keyof TestObj],
                                show: false
                            }
                        })
                    })}
                    color="red"
                    >
                        Delete
                    </MyButton>
                </div>)
            }
            <MyButton
             onClick={()=> setWords(prev => {
                const ids = nanoid()
                return ({
                    ...prev,
                    [ids]: {
                        name: '',
                    translation: '',
                    show: true
                    }
                })
            })}
            >
                Add Word
            </MyButton>
        </div>
    );
}

export default FastAddWord;