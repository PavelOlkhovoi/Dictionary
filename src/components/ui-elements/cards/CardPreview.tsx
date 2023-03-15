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
        <div className='bg-white shadow px-8 py-6 cursor-pointer border-b-2 pb-2'>
            <Link to={link} className="flex flex-col h-full">
            <h3 className={`${styleTW.title3} mb-2 border-b-2 pb-2 border-gray-200`}>{title}</h3>
            <div className='mb-2 text-sm font-medium text-gray-700'>Used words {wordsQuantity}</div>
            <div className='md:my-10'>
            {
                <TextHighlighter words={fullWords as WordDb[]} text={preview} wordsBack={()=>console.log('12345')} />
            }
            </div>
            <div className='font-medium mt-auto flex justify-between items-baseline mt-auto mb-4'>
                <div className='text-sm font-medium text-gray-700'>12 day ago</div>
                <div>
                    <LineButton>Read</LineButton>
                </div>
            </div>
            </Link>
        </div>
    )
}


export default CardPreview;