import {useState, useEffect} from 'react'
import { WordDb } from '../../pages/types/word'

interface Props {
    words: WordDb[]
    text: string
}

const TextHighlighter = ({words, text}:Props) => {
    const [compoundWords, setCompoundsWords] = useState<string[]>([])
    const [simpleWords, setSimpleWords] = useState<string[]>([])
    const usedWords: string[] = []

    useEffect(()=> {
        words.forEach(word => {
            if(word.word.split(' ').length > 1 ){
                setCompoundsWords(prev => [...prev, word.word])
            }else {
                setSimpleWords(prev => [...prev, word.word])
            }
        })
    }, [words])

    useEffect(()=> {
        console.log(usedWords)
    }, [text])

    return (
        <div>
            {
                text.split(' ').map((tw, idx) => {
                    if(compoundWords.some(w => w.split(' ').includes(tw.replace('.', '')))){
                        usedWords.push(tw.trim())
                        return <span key={tw + idx} className="bg-blue-400">{tw} </span>
                    }
                    if(simpleWords.some(w => w.includes(tw.replace('.', '')))){
                        usedWords.push(tw.trim())
                        return <span key={tw + idx} className="bg-yellow-400">{tw} </span>
                    }
                        return <span key={tw + idx}>{tw} </span>
                   })
            }
        </div>
    );
}

export default TextHighlighter;