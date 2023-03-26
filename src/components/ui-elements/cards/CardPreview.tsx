import { Link } from "react-router-dom"
import { styleTW } from "../../../style"
import LineButton from "../buttons/LineButton"
import { useAppSelector } from "../../../hooks/redux-hooks"
import { selectAllWordsIdsInArr, selectWordsArrById } from "../../../store/slices/wordSlice"
import { useEffect } from "react"
import TextHighlighter from "../../text/TextHighlighter"
import { WordDb } from "../../../pages/types/word"

interface Props {
    link: string
    wordsIds: string[]
    date?: string
    content: string
    title: string
}
const CardPreview = ({link, wordsIds, content, title}: Props) => {
    const wordsQuantity = wordsIds.length
    const shortContent = content.trim().split(' ').filter((t, ids) => ids < 30)
    const preview = shortContent.map((t,id) => {
        const lastWord = shortContent[shortContent.length-1]
        if(lastWord === t){ t.replace('.', '')
            return `${t}...`
        }
        return t
    }).join(' ')

    const fullWords = useAppSelector(state => selectWordsArrById(state, wordsIds))

    return (
        <div className={`${styleTW.cardWhite}`}>
            <Link to={link} className="flex flex-col h-full">
            <h3 className={`${styleTW.title3} mb-2 border-b-2 pb-2 border-gray-200`}>{title}</h3>
            <div className='mb-2 text-sm font-medium text-gray-700'>Used words {wordsQuantity}</div>
            <div className='md:my-10'>
            {
                <TextHighlighter words={fullWords as WordDb[]} text={preview} wordsBack={()=>console.log('12345')} />
            }
            </div>
            <div className='font-medium mt-auto flex justify-between items-baseline mt-auto mb-4'>
                <div className='text-sm font-medium text-gray-700'>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                <svg aria-hidden="true" className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
                2 minutes ago
                </span>
                </div>
                <div>
                    <LineButton>Read</LineButton>
                </div>
            </div>
            </Link>
        </div>
    )
}


export default CardPreview;