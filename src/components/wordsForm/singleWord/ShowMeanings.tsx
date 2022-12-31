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
                const items = meanings[m].map(i => <li key={i} className="mt-0">{i}</li>)
                const list = <div
                 key={m}
                 >
                    <h4 className="text-sky-400">{firstCapitalLetter(m)}</h4>
                    <ul
                     role="list" className="marker:text-sky-400 mt-0 list-disc pl-5 space-y-3 text-slate-500"
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