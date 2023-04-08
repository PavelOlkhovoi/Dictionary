import { Tag } from '../../../../types/word';
import { styleTW } from '../../../../style';

interface Props {
    clickFunc?: Function
    tag: Tag
}
const ShowSimpleTag = ({clickFunc, tag}: Props) => {

    const handleClick = () => (clickFunc) && clickFunc(tag.tagId)

    return (
        <span 
        className={`${styleTW.bageBlue}`}
        onClick={handleClick}
        >
            {tag.name}
        </span>
    )
}

export default ShowSimpleTag;