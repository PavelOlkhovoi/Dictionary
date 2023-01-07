import { MeanigsForServer } from "../../../pages/types/word";
import { firstCapitalLetter } from "../../../helpers/display";
import { styleTW } from "../../../style";

interface Props {
    meanings: MeanigsForServer
}

const ShowMeanings = ({meanings}: Props) => {
    const name = meanings ? Object.keys(meanings) : []
   
    return <div className="my-4">
        {
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
    </div>;
}

export default ShowMeanings;