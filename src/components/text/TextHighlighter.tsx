import {FC, useEffect} from 'react'
import { sortSimpleAndCompoundWordsFromWordDb } from '../../helpers/wordMatcher'
import { WordDb } from '../../types/word'
import { AllWordsSorted } from '../../types/word'
import LineButton from '../ui-elements/buttons/LineButton'
import MyButton from '../wordsForm/ui/MyButton'

interface Props {
    words: WordDb[]
    text: string
    wordsBack: Function
    children?: React.ReactNode
    textButton?: string
}

const TextHighlighter: FC<Props> = ({words, text, wordsBack, children, textButton}) => {
    const res: AllWordsSorted[] = sortSimpleAndCompoundWordsFromWordDb(words, text)

    return (
        <div className='pb-20'>
             <div className='my-3 md:my-4 text-lg'>
             {
                text.split(' ').map((tw, idx) => {
                    let pos: number = 0
                    let color: string = ''

                    res.forEach(usedW => {
                        if(usedW.position.length > 1 && usedW.position.some(pos => pos === idx)){
                            pos = idx
                            color = `text-blue-800 font-medium`
                        }else if(usedW.position.length === 1 && usedW.position.some(pos => pos === idx)){
                            pos = idx
                            color = `text-yellow-600 font-medium`
                        }
                    })

                    if(idx === pos){
                        return <span key={tw + idx} className={color}>{tw} </span>
                    }else {
                        return <span key={tw + idx}>{tw} </span>
                    }

                })
            }
             </div>

            {children}
            <div className='mt-6'>
            {
                textButton && <LineButton color='green' onClick={()=> wordsBack(res)}>{textButton}</LineButton>
            }
            </div>
        </div>
    );
}

export default TextHighlighter;