import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import MyButton from "../../components/wordsForm/ui/MyButton";
import { useAppSelector } from "../../hooks/redux-hooks";
import { styleTW } from "../../style";
import { formatDistanceToNow, parseISO } from "date-fns";
import { firstCapitalLetter } from "../../helpers/display";
import { selectWordsForFirstExercise } from "../../store/slices/wordSlice";

const ListSets = () => {
    const sets = useAppSelector(state => state.set.sets)
    const setsStatus = useAppSelector(state => state.set.status)
    const wordsForFierstRepetition = useAppSelector(state => selectWordsForFirstExercise(state))

    if(setsStatus === "pending") {return <Loading/>}

    if(!sets){return <h1>Data have not been loaded</h1>}



    return (
    <section className={`${styleTW.container} my-8`}>
        <div className="m-auto max-w-lg">
            <div className="flex flex-col items-center gap-3">
                <h1 className={`${styleTW.title1}`}>Your sets</h1>
                <MyButton className="m-auto" color="green">
                    <Link to="/addSet">Add new set</Link>
                </MyButton>
            </div>


        <div className="flex gap-8 my-8">
            <div>
                <h2 className={`${styleTW.title2}`}>Last seven sets</h2>
            {
                sets.map(s => <li key={s.setId}>
                    <Link
                        to={{pathname:`/sets/${s.setId}`}}
                    >
                        {firstCapitalLetter(s.name)} - {formatDistanceToNow(parseISO(s.createdAt as string), {addSuffix: true})}
                    </Link>
                </li>)
            }
            </div>



            <div>
                <h2 className={`${styleTW.title2}`}>Repetition</h2>
                <ul>
                    <li><Link to="/exercises">Repeat for the first time</Link></li>
                    <li>Second repetition</li>
                    <li>Third repetition</li>
                    <li>Fourth repetition</li>
                    <li>Sixth repetition</li>
                    <li>Seventh repetition</li>
                </ul>
            </div>
        </div>

        </div>
    </section>
)
}

export default ListSets;