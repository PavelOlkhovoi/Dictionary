import { Link } from "react-router-dom";
import LineButton from "../buttons/LineButton";

interface Props {
    recordsLength: number
    link: string
    textBtn: string
    message: string
}
const CreateFfirstRecord = ({recordsLength, link, textBtn, message}: Props) => {
    return (
        <>
         {
            recordsLength === 0 &&
            <div className="flex flex-col gap-2 items-start text-xl">
                <span>
                    { message }
                </span>
            
                <LineButton>
                    <Link to={link}>
                        {textBtn}
                    </Link>
                </LineButton>
            </div>
            }
        </>
    )
}


export default CreateFfirstRecord;