import {FC} from 'react'
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes  {
    children: React.ReactNode, 
    color?: string
}

const MyButton: FC<ButtonProps> = ({children, color = 'blue', ...rest}) => {
    let nameOfRegularColor = `bg-blue-500`
    let nameOfHoverColor = `hover:bg-blue-700`

    if(color === 'red'){
        nameOfRegularColor = "bg-red-500"
        nameOfHoverColor = "hover:bg-red-700"
    }

    if(color === 'green'){
        nameOfRegularColor = "bg-green-500"
        nameOfHoverColor = "hover:bg-green-700"
    }

    return (
        <button {...rest}
        className={`${nameOfRegularColor} ${nameOfHoverColor} text-white font-bold py-2 px-4 rounded h-fit justify-self-auto`}
        >
            {children}
        </button>
    );
}

export default MyButton;