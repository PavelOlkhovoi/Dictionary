import useInput from '../../../hooks/useInput'
import { Tag } from '../../../pages/types/word'
import { styleTW } from '../../../style'

interface Props {
    oldTag: Tag,
    deleteTag: Function
}
const EditTag = ({oldTag, deleteTag}: Props) => {
    const tag = useInput(oldTag.name)

    return (
        <div>
            <span className={`${styleTW.bageRed} mt-3 ml-5 cursor-pointer`}
                onClick={()=> deleteTag(oldTag.tagId)}
            >{tag.value} x</span>
        </div>
    );
}


export default EditTag;