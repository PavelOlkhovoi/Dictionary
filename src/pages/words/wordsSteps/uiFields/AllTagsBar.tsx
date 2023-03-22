import { styleTW } from "../../../../style";
import { Tag } from "../../../types/word";

interface Props {
    manageClick: Function,
    tags: Tag[]
}

const AllTagsBar = ({manageClick, tags}: Props) => {
    const handleClick = (id: string, tagName: string) => {
        manageClick(id, tagName)
    }
    return (
        <div className="flex flex-wrap gap-2">
            {
                tags.map(t => <div 
                    key={t.tagId}
                    className={`${styleTW.bageBlue}`}
                    onClick={() => handleClick(t.tagId, t.name)}
                    >
                        {t.name}
                    </div>)
            }
        </div>
    )
}


export default AllTagsBar;