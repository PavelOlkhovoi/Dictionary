import {ReactNode} from 'react'
import LineButton from '../../../components/ui-elements/buttons/LineButton';
import { styleTW } from '../../../style';

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
                    <span className=''>Step {step} of 4</span>
                </div>
                {fieldSet}
                <div className='flex gap-6 mt-6'>
                    <LineButton>Save</LineButton>
                    <div className='flex gap-4'>
                        <div onClick={()=> changeStep(1)}>1 <span>Add word</span></div>
                        <div onClick={()=> changeStep(2)}>2 <span>Add translation</span></div>
                        <div onClick={()=> changeStep(3)}>3 <span>Add example</span></div>
                        <div onClick={()=> changeStep(4)}>4 <span>Add example</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardStepsWords;