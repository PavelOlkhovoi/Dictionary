import {FC} from 'react'
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes  {
    children: React.ReactNode, 
    color?: string
}

const MyButton: FC<ButtonProps> = ({children, color = 'blue', ...rest}) => {
    return (
        <button {...rest}
        className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded h-fit justify-self-auto`}
        >
            {children}
        </button>
    );
}

export default MyButton;