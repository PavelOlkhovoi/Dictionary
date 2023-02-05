import { useAppSelector } from "../../hooks/redux-hooks";
import Loading from "../../components/Loading"
import { styleTW } from "../../style";
import PreviewText from "../../components/text/PreviewText";

const ListTexts = () => {
    const texts = useAppSelector(state => state.text.texts)
    const textsStatus = useAppSelector(state => state.text.status)

    if(textsStatus === 'pending'){
        return <Loading />
    }
    return (
        <section className={styleTW.container}>
            <h1 className={styleTW.title1}>Your texts</h1>
            {
                texts.map(t => <PreviewText text={t} key={t.textId}/>)
            }
        </section>
    );
}


export default ListTexts;