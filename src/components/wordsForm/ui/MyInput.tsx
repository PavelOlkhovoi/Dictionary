import {FC, InputHTMLAttributes} from 'react'
import MyButton from './MyButton';


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
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {
          edit && <MyButton onClick={() => editFunct()}>Save</MyButton>
        }
      </div>
    )
}


export default MyInput;