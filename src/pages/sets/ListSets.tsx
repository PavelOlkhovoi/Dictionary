import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import MyButton from "../../components/wordsForm/ui/MyButton";
import { useAppSelector } from "../../hooks/redux-hooks";
import { styleTW } from "../../style";
import { formatDistanceToNow, parseISO } from "date-fns";
import { firstCapitalLetter } from "../../helpers/display";
import LineButton from "../../components/ui-elements/buttons'/LineButton";
import PreviewText from "../../components/text/PreviewText";
import GetSetsData from "../../components/adapter/GetSetsData";

const ListSets = () => {
    const sets = useAppSelector(state => state.set.sets)
    const setsStatus = useAppSelector(state => state.set.status)

    if(setsStatus === "pending") {return <Loading/>}

    if(!sets){return <h1>Data have not been loaded</h1>}

    return (
    <section className={`${styleTW.containerWide}`}>
        <div className={`flex gap-8 items-center`}>
                <h1 className={`${styleTW.title1} my-8`}>Your sets</h1>
                <LineButton className="m-auto" color="green">
                    <Link to="/sets/add">Add new set</Link>
                </LineButton>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-12">
            {
                sets.map(s => {
                    return <GetSetsData set={s} key={s.setId}/>
                })
            }
            </div>
    </section>
)
}

// {
//     sets.map(s => <li key={s.setId}>
//         <Link
//             to={{pathname:`/sets/${s.setId}`}}
//         >
//             {firstCapitalLetter(s.name)} - <b>{formatDistanceToNow(parseISO(s.createdAt as string), {addSuffix: true})}</b>
//         </Link>
//     </li>)
// }

export default ListSets;