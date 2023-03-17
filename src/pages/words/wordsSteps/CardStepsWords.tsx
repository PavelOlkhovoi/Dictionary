import {ReactNode} from 'react'
import LineButton from '../../../components/ui-elements/buttons/LineButton';
import { styleTW } from '../../../style';
import WordStepPagination from './WordStepPagination';

interface Props {
    step: number
    fieldSet: ReactNode,
    changeStep: React.Dispatch<React.SetStateAction<number>>
}

const CardStepsWords = ({fieldSet, step, changeStep}: Props) => {
    return (
        <div className={`${styleTW.containerWide}`}>
            <div className='border-2 flex-col'>
                <div className='flex justify-between items-center'>
                    <h1 className={`${styleTW.title1}`}>Add Words</h1>
                    <span>Step <span className='text-blue-600 font-medium'>{step}</span> of 4</span>
                </div>
                {fieldSet}
                <div className='flex gap-6 mt-6'>
                    <LineButton>Save</LineButton>
                    <WordStepPagination currentStep={step} changeStep={changeStep}/>
                </div>
            </div>
        </div>
    )
}

export default CardStepsWords;