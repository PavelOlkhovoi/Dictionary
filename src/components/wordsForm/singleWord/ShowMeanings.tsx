import { MeanigsForServer } from "../../../pages/types/word";
import { firstCapitalLetter } from "../../../helpers/display";
import { styleTW } from "../../../style";
import LineButton from "../../ui-elements/buttons'/LineButton";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { selectWordById } from "../../../store/slices/wordSlice";

interface Props {
    meanings: MeanigsForServer,
    wordId: string,
    fastMeaning?: string | null | undefined
}

const ShowMeanings = ({meanings, wordId, fastMeaning}: Props) => {
    const name = meanings ? Object.keys(meanings) : []
   
    return <div className="my-2">
        {   
            name.length > 0 && name.map(m => {
                const trenslates = meanings[m].map(i => 
                <div key={i} className="border-b-2 pb-1 flex gap-8 items-center">
                    <div className="w-3/5">
                        {firstCapitalLetter(i)}
                    </div>
                    <div className="w-2/5 flex gap-4 p-1">
                        <LineButton>Edit</LineButton>
                        <LineButton color="red">Delete</LineButton>
                    </div>
                </div>)
                const partOfSpeech = <div key={m}>
                    <b className={``}>{firstCapitalLetter(m)}</b> <span>{trenslates}</span>
                </div>

                return meanings[m][0] === "" || meanings[m].length === 0 ? null : partOfSpeech
            })
        }

        {
            fastMeaning && <div className="border-b-2 pb-1 flex gap-8 items-center">
            <div className="w-3/5">
                    {firstCapitalLetter(fastMeaning)}
                </div>
                <div className="w-2/5 flex gap-4 p-1">
                    <LineButton>Edit</LineButton>
                    <LineButton color="red">Delete</LineButton>
                </div>
            </div>
        }
    </div>;
}

export default ShowMeanings;