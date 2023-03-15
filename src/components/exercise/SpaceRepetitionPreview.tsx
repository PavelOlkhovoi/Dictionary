import {Link} from 'react-router-dom';
import { styleTW } from '../../style';
import LineButton from '../ui-elements/buttons\'/LineButton';

interface Props {
    step: number,
    title: string,
    numberOfWords: number

}
const SpaceRepetitionPreview = ({step, title, numberOfWords}:Props) => {
    return (
        <div className={`${styleTW.bottomBorder} py-2`}>
            <Link to={{pathname: `/words/${step}`}} className='flex gap-8 items-center'>
                <div className='w-3/5'>{title}</div>
                <div className='text-sm w-1/5'>{numberOfWords}</div>
                <div className='w-1/5 flex justify-end'><LineButton>Start</LineButton></div>
            </Link>
        </div>
    );
}

export default SpaceRepetitionPreview;