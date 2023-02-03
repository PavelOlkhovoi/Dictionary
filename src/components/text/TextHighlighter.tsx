import {FC} from 'react'
import { sortSimpleAndCompoundWordsFromWordDb } from '../../helpers/wordMatcher'
import { WordDb } from '../../pages/types/word'
import { AllWordsSorted } from '../../pages/types/word'
import MyButton from '../wordsForm/ui/MyButton'

interface Props {
    words: WordDb[]
    text: string
    wordsBack: Function
    children?: React.ReactNode
}

const TextHighlighter: FC<Props> = ({words, text, wordsBack, children}) => {
    const res: AllWordsSorted[] = sortSimpleAndCompoundWordsFromWordDb(words, text)

   
    return (
        <div>
             {
                text.split(' ').map((tw, idx) => {
                    let pos: number = 0
                    let color: string = ''
                   
                    res.forEach(usedW => {
                        if(usedW.position.some(pos => pos === idx)){
                            pos = idx
                            color = `bg-${usedW.color}-400`
                        }
                    })

                    if(idx === pos){
                        return <span key={tw + idx} className={color}>{tw} </span>
                    }else {
                        return <span key={tw + idx}>{tw} </span>
                    }

                })
            }

            {children}

            
            <MyButton color='green' onClick={()=>  wordsBack(res)}>Add text</MyButton>

        </div>
    );
}

export default TextHighlighter;