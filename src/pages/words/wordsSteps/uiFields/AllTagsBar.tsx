import useTags from "../../../../hooks/useTags";
import { styleTW } from "../../../../style";

interface Props {
    manageClick: Function
}

const AllTagsBar = ({manageClick}: Props) => {
    const tags = useTags()
    const handleClick = (id: string, tagName: string) => {
        manageClick(id, tagName)
    }
    return (
        <div className="flex flex-wrap gap-2">
            {
                tags.all.map(t => <div 
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