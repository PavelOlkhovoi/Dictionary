import {FC, InputHTMLAttributes} from 'react'
import MyButton from './MyButton';
import { styleTW } from '../../../style';


interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label: string,
    edit?: boolean,
    editFunct?: Function
}
const MyInput: FC<Props> = ({name, label, edit = false, editFunct = () => console.log('Click'), ...rest}) => {
    return (
        <div>
        <label
        htmlFor={label}
          className="block mb-2 text-sm font-medium text-gray-700 undefined"
        >
          Type {name}
        </label>
        <input
        name={name}
        {...rest} 
        className="border-b-2 border-gray-800 w-full py-2 px-3 text-gray-700 bg-transparent leading-tight focus:outline-none focus:shadow-outline"
        />
        {
          edit && <MyButton onClick={() => editFunct()}>Save</MyButton>
        }
      </div>
    )
}


export default MyInput;