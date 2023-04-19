import { useState } from "react"

interface Props {
    currentStep: number
    changeStep: React.Dispatch<React.SetStateAction<number>>
}

const WordStepPagination = ({currentStep, changeStep}:Props) => {
    const [steps, setStep] = useState([{step: 1, text: 'Add word'}, {step: 2, text: 'Add translation'},
    {step: 3, text: 'Add example'}, {step: 4, text: 'Add tags'}])
    return (
        <div className='flex gap-3 sm:gap-6 items-center'>
            {
                steps.map(s => {
                    if(s.step === currentStep){
                        return <div 
                        key={s.step} 
                        onClick={()=>changeStep(s.step)}>
                        <span className="text-blue-600 font-medium cursor-pointer">{s.step}</span>
                        </div>
                    }else if (s.step === currentStep + 1){
                        return <div key={s.step} onClick={()=>changeStep(s.step)} className="cursor-pointer"><span> {s.text}</span></div>
                    }else {
                        return <div key={s.step} onClick={()=>changeStep(s.step)} className="cursor-pointer"><span>{s.step}</span></div>
                    }
                })
            }
        </div>
    )
}

export default WordStepPagination;