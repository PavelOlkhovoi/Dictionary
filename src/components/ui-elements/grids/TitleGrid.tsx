import {ReactNode} from 'react'
import { styleTW } from "../../../style"
import { firstCapitalLetter } from "../../../helpers/display"

interface Props {
    title: string
    children?: ReactNode
    typeOfTitle: 'h1' | 'h2'
}
const TitleGrid = ({title, children, typeOfTitle}: Props) => {
    return (
        <>
         <div className={`${styleTW.bottomBorder} ${styleTW.gridLineTitle} mb-2 pb-6`}>
            {
                typeOfTitle === 'h1' && <h1 className={`${styleTW.title1}`}>{firstCapitalLetter(title)}</h1>
            }
            {
                typeOfTitle === 'h2' && <h2 className={`${styleTW.title2}`}>{firstCapitalLetter(title)}</h2>
            }
                
                <div className="flex gap-6 justify-start items-start">
                   {children}
                </div>
            </div>
        </>
    )
}


export default TitleGrid;