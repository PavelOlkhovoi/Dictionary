import {ReactNode} from 'react'
import { styleTW } from '../../../style';

interface Props {
    step: number
    fieldSet: ReactNode,
    stepСontrol?: ReactNode
}

const CardStepsWords = ({fieldSet, step, stepСontrol}: Props) => {
    return (
        <div className={`${styleTW.containerWide}`}>
            <div className='border-2 flex-col'>
                <div className='flex justify-between items-center'>
                    <h1 className={`${styleTW.title1}`}>Add Words</h1>
                    <span className=''>Step {step} of 4</span>
                </div>
                {fieldSet}
                {stepСontrol}
            </div>
        </div>
    )
}

export default CardStepsWords;