import { useAppSelector } from "../../hooks/redux-hooks";
import Loading from "../../components/Loading"
import { styleTW } from "../../style";
import { text } from "node:stream/consumers";
import { Link } from "react-router-dom";

const ListTexts = () => {
    const texts = useAppSelector(state => state.text.texts)
    const textsStatus = useAppSelector(state => state.text.status)

    if(textsStatus === 'pending'){
        return <Loading />
    }
    return (
        <section className={styleTW.container}>
            <h1 className={styleTW.title1}>Your texts</h1>
            <Link to="/addText" className="text-center cursor-pointer text-blue-600 hover:text-blue-400 block">Add new text</Link>
            {
               texts.map(t => <Link to={{
                pathname: `/texts/${t.textId}`
               }} key={t.textId}>{t.title}</Link>)
            }
        </section>
    );
}


export default ListTexts;