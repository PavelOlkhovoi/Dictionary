import {FC, InputHTMLAttributes} from 'react'


interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label: string
}
const MyInput: FC<Props> = ({name, label, ...rest}) => {
    return (
        <div className="my-5">
        <label
        htmlFor={label}
          className="block mb-2 text-sm font-medium text-gray-700 undefined"
        >
          Type word
        </label>
        <input
        name={name}
        {...rest}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    )
}


export default MyInput;