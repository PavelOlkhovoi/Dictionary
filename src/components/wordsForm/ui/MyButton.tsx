import {FC} from 'react'
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes  {
    children: React.ReactNode, 
    color?: string
}

const MyButton: FC<ButtonProps> = ({children, color = 'bg-blue-500', ...rest}) => {
    return (
        <button {...rest}
        className={`${color} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
        >
            {children}
        </button>
    );
}

export default MyButton;