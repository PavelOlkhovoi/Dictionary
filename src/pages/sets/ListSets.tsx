import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";
import { styleTW } from "../../style";
import LineButton from "../../components/ui-elements/buttons'/LineButton";
import GetSetsData from "../../components/adapter/GetSetsData";

const ListSets = () => {
    const sets = useAppSelector(state => state.set.sets)

    return (
        <section className={`${styleTW.containerWide}`}>
            <div className="flex gap-8 items-center">
                <h1 className={`${styleTW.title1} my-8`}>Your sets</h1>
            <div>
                <LineButton>
                    <Link to="/sets/add">Add set</Link>
                </LineButton>
            </div>
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


export default ListSets;