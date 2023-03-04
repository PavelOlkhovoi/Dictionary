import { Link } from 'react-router-dom';
import { Text } from '../../pages/types/word';
import { styleTW } from '../../style';
import LineButton from '../ui-elements/buttons\'/LineButton';

interface Props {
    text: Text
}
const PreviewText = ({text}:Props) => {
    const preview = text.text.split(' ').filter((t, ids) => ids < 30)
    const wordsQuantity = text.wordsIds.length
    return (
        <div className='bg-white shadow px-8 py-6 cursor-pointer border-b-2 pb-2'>
            <Link to={{pathname: `/texts/${text.textId}`}} className="flex flex-col h-full">
            <h3 className={`${styleTW.title3} mb-2 border-b-2 pb-2 border-gray-200`}>{text.title}</h3>
            <div className='mb-2 text-sm font-medium text-gray-700'>Used words {wordsQuantity}</div>
            <div className='my-10'>
            {
                preview.map((t, ids) => {
                    if(t === " "){
                        return ''
                    }
                    const clearText = t.trim().replace('.', '')
                    return preview.length -1 === ids ? <span key={ids}>{clearText}...</span> : <span key={ids}>{clearText} </span>
                })
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

export default PreviewText;