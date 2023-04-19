import { DeleteBtnIds } from "../../../../types/word"

interface Props {
    deleteHandler: Function,
    idsBtn?: DeleteBtnIds
}
const DeleteBtn = ({deleteHandler, idsBtn}:Props) => {
    const manageHandler = () => {
      if(idsBtn){
        deleteHandler(idsBtn)
      }else {
        deleteHandler()
      }
    }
    return (
      <span className="inline-flex items-center p-1 mr-2 text-gray-800 bg-transporent rounded-full border border-red-500"
      onClick={manageHandler}
      >
        <svg aria-hidden="true" className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </span>
    )
}


export default DeleteBtn;