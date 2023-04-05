import {FC} from 'react'
import { styleTW } from '../../../style'
import { useEffect } from 'react'

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes  {
    children: React.ReactNode, 
    color?: string
    detach?: boolean
}

const LineButton: FC<ButtonProps> = ({children, color, detach, ...rest}) => {
    let normalColor = `border-yellow-500`
    let hoverColor = `hover:border-yellow-700`
    const active = detach ? styleTW.btnDisable : ''

    if(color === 'red'){
        normalColor = "border-red-500"
        hoverColor = "hover:border-red-700"
    }

    if(color === 'green'){
        normalColor = "border-green-500"
        hoverColor = "hover:border-green-700"
    }

    if(color === 'blue'){
        normalColor = "border-blue-500"
        hoverColor = "hover:border-blue-700"
    }

    return <button 
    className={`${normalColor} ${hoverColor} ${active} border-b-2 text-sm font-medium`}
    disabled={detach}
    {...rest}
    >
        {children}
    </button>;
}

export default LineButton;