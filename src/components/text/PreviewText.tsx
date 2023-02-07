import { Link } from 'react-router-dom';
import { Text } from '../../pages/types/word';
import { styleTW } from '../../style';

interface Props {
    text: Text
}
const PreviewText = ({text}:Props) => {
    const preview = text.text.split(' ').filter((t, ids) => ids < 30)
    return (
        <div className='my-8 max-w-sm bg-gray-50 shadow p-6 rounded cursor-pointer mx-auto relative'>
            <Link to={{pathname: `/texts/${text.textId}`}}>
            <h3 className={`${styleTW.title3} mb-2`}>{text.title}</h3>
            {
                preview.map((t, ids) => <span key={ids}>{t} </span>)
            }...
            <div className='absolute top-0 right-2 p-2 text-xs text-blue-600 font-medium'>
                12 day ago
            </div>
            </Link>
        </div>
    )
}

export default PreviewText;