import { MeanigsForServer } from "../../../pages/types/word";
import { firstCapitalLetter } from "../../../helpers/display";
import { styleTW } from "../../../style";
import EditMeanings from "../../edit/word/EditMeanings";

interface Props {
    meanings: MeanigsForServer,
    isEdit: boolean,
    wordId: string
}

const ShowMeanings = ({meanings, isEdit, wordId}: Props) => {
    const name = meanings ? Object.keys(meanings) : []
   
    return <div className="my-4">
        {   isEdit &&
            name.map(m => {
                const items = meanings[m].map(i => <li key={i} className="mt-0">{firstCapitalLetter(i)}</li>)
                const list = <div
                 key={m}
                 >
                    <h3 className={styleTW.title3}>{firstCapitalLetter(m)}</h3>
                    <ul
                     className="mt-0"
                     >
                    {items}
                    </ul>
                </div>

                return list
            })
        }

        {
            !isEdit && meanings &&
            <EditMeanings wordId={wordId} oldMeanings={meanings}/>
        }
    </div>;
}

export default ShowMeanings;