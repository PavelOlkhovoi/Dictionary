import {FC} from 'react'
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes  {
    children: React.ReactNode, 
    color?: string
}

const LineButton: FC<ButtonProps> = ({children, color}) => {
    let normalColor = `border-yellow-500`
    let hoverColor = `hover:border-yellow-700`

    if(color === 'red'){
        normalColor = "border-red-500"
        hoverColor = "hover:border-red-700"
    }

    if(color === 'green'){
        normalColor = "border-green-500"
        hoverColor = "hover:border-green-700"
    }
    return <button className={`${normalColor} ${hoverColor} border-b-2 text-sm font-medium`}>{children}</button>;
}

export default LineButton;