import {ReactNode} from 'react'
import LineButton from '../../../components/ui-elements/buttons/LineButton';
import { styleTW } from '../../../style';
import WordStepPagination from './WordStepPagination'
import { WordForm } from './AddWordsWithSteps';


interface Props {
    step: number
    fieldSet: ReactNode,
    changeStep: React.Dispatch<React.SetStateAction<number>>
    changeWordState: React.Dispatch<React.SetStateAction<WordForm>> 
    errorless: boolean
}

const CardStepsWords = ({fieldSet, step, changeStep, changeWordState, errorless = true}: Props) => {

    const sendData = () => {
        changeWordState(wState => ({...wState, sendingData: true}))
        changeStep(prev => 1)
    }

    return (
        <div className={`${styleTW.containerWide} ${styleTW.cardWhite} bg-white`}>
            <div className='flex-col p-4'>
                <div className='flex justify-between items-baseline'>
                    <h1 className={`${styleTW.title1}`}>Add Words</h1>
                    <span>Step <span className='text-blue-600 font-medium'>{step}</span> of 4</span>
                </div>
                <div className='py-4'>
                    {fieldSet}
                </div>
                <div className='flex gap-6 mt-6 justify-between'>
                    <LineButton 
                    disabled={!errorless} 
                    detach={!errorless} 
                    onClick={sendData}
                    >
                        Save
                    </LineButton>
                    <WordStepPagination currentStep={step} changeStep={changeStep}/>
                </div>
            </div>
        </div>
    )
}

export default CardStepsWords;