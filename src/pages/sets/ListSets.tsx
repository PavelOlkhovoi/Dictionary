import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import MyButton from "../../components/wordsForm/ui/MyButton";
import { useAppSelector } from "../../hooks/redux-hooks";
import { styleTW } from "../../style";
import { formatDistanceToNow, parseISO } from "date-fns";
import { firstCapitalLetter } from "../../helpers/display";

const ListSets = () => {
    const sets = useAppSelector(state => state.set.sets)
    const setsStatus = useAppSelector(state => state.set.status)

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
                        {firstCapitalLetter(s.name)} - <b>{formatDistanceToNow(parseISO(s.createdAt as string), {addSuffix: true})}</b>
                    </Link>
                </li>)
            }
            </div>



            <div>
                <h2 className={`${styleTW.title2}`}>Repetition</h2>
                <ul>
                    <li><Link to="/exercises/1">Repeat for the first time</Link></li>
                    <li><Link to="/exercises/2">Second repetition</Link></li>
                    <li><Link to="/exercises/3">Third repetition</Link></li>
                    <li><Link to="/exercises/4">Fourth repetition</Link></li>
                    <li><Link to="/exercises/5">Repeat for the first time</Link></li>
                    <li><Link to="/exercises/6">Sixth repetition</Link></li>
                    <li><Link to="/exercises/7">Seventh repetition</Link></li>
                </ul>
            </div>
        </div>

        </div>
    </section>
)
}

export default ListSets;