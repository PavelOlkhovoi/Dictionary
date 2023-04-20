import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";
import { styleTW } from "../../style";
import LineButton from "../../components/ui-elements/buttons/LineButton";
import GetSetsData from "../../components/adapter/GetSetsData";

const ListSets = () => {
    const sets = useAppSelector(state => state.set.sets)

    return (
        <section className={`${styleTW.containerWide} mb-16`}>
            <div className="flex gap-8 items-center">
                <h1 className={`${styleTW.title1} ${styleTW.title1Gap}`}>Your sets</h1>
            <div>
                <LineButton>
                    <Link to="/sets/add">Add set</Link>
                </LineButton>
            </div>
            </div>
            <div className={`${styleTW.cardsTwoRows}`}>
            {
                sets.map(s => {
                    return <GetSetsData set={s} key={s.setId}/>
                })
            }
            </div>
        </section>
    )
}


export default ListSets;