import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import MyButton from "../../components/wordsForm/ui/MyButton";
import { useAppSelector } from "../../hooks/redux-hooks";
import { styleTW } from "../../style";
import { formatDistanceToNow, parseISO } from "date-fns";
import SetWordsToLern from "./SetWordsToLern";

const ListSets = () => {
    const sets = useAppSelector(state => state.set.sets)
    const setsStatus = useAppSelector(state => state.set.status)

    if(setsStatus === "pending") {return <Loading/>}

    if(!sets){return <h1>Data have not been loaded</h1>}



    return (
    <section className={`${styleTW.container}`}>
        <div className="m-auto max-w-lg">
            <div className="flex flex-col items-center gap-3">
                <h1 className={`${styleTW.title1}`}>Your sets</h1>
                <MyButton className="m-auto" color="green">
                    <Link to="/addSet">Add new set</Link>
                </MyButton>
                <MyButton className="m-auto">
                    <Link to="/exercises">Learn words</Link>
                </MyButton>
            </div>
        <ul>
        {
            sets.map(s => <li key={s.setId}>
                <Link
                    to={{pathname:`/sets/${s.setId}`}}
                >
                    {s.name} 
                    <p>{formatDistanceToNow(parseISO(s.createdAt as string), {addSuffix: true})}</p>
                </Link>
            </li>)
        }
        </ul>
        </div>
    </section>
)
}

export default ListSets;