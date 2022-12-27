import { MeanigsForServer } from "../../../pages/types/word";
import { firstCapitalLetter } from "../../../helpers/display";

interface Props {
    meanings: MeanigsForServer
}

const ShowMeanings = ({meanings}: Props) => {
    const name = meanings ? Object.keys(meanings) : []
   
    return <div>
        {
            name.map(m => {
                const items = meanings[m].map(i => <li key={i}>{i}</li>)
                const list = <ul key={m}><h4>{firstCapitalLetter(m)}</h4>
                    {items}
                </ul>

                return list
            })
        }
    </div>;
}

export default ShowMeanings;