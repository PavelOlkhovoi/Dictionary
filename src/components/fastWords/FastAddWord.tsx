import {useState, useEffect} from 'react'
import { nanoid } from '@reduxjs/toolkit'
import MyButton from '../wordsForm/ui/MyButton'
import { styleTW } from '../../style'

export interface WordsBasicWithId {
    [index: string]: WordsBasic
}

interface WordsBasic {
    name: string
    translation: string
    show: Boolean
}

interface Props {
    getWords: Function
}

const FastAddWord = ({getWords}: Props) => {

const [words, setWords] = useState<WordsBasicWithId>({
    [nanoid()]: {
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
                <div className='[&>:last-child]:my-8'>
            {
                idsArr.map(w => words[w as keyof WordsBasicWithId].show && <div key={w} className={`${styleTW.card} mt-6`}>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                    Word
                    <input className={`${styleTW.shadow} w-full`} value={words[w as keyof WordsBasicWithId].name}
                    onChange={(e) => setWords(prev => ({
                        ...prev,
                        [w as keyof WordsBasicWithId]: {
                            ...prev[w as keyof WordsBasicWithId],
                            name: e.target.value
                        }
                    }))}
                    />
                    </label>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                    Translation
                    <input className={`${styleTW.shadow} w-full`} value={words[w as keyof WordsBasicWithId].translation}
                    onChange={(e) => setWords(prev => ({
                        ...prev,
                        [w as keyof WordsBasicWithId]: {
                            ...prev[w as keyof WordsBasicWithId],
                            translation: e.target.value
                        }
                    }))}
                    />
                    </label>
                    <MyButton
                    onClick={()=> setWords(prev => {
                        return ({
                            ...prev,
                            [w as keyof WordsBasicWithId]: {
                                ...prev[w as keyof WordsBasicWithId],
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
        <MyButton onClick={()=> getWords(words)} color='green'>Add Set</MyButton>
    </div>
    );
}

export default FastAddWord;