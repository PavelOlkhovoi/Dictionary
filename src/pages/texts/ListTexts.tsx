import { useAppSelector } from "../../hooks/redux-hooks";
import Loading from "../../components/Loading"
import { styleTW } from "../../style";
import PreviewText from "../../components/text/PreviewText";
import LineButton from "../../components/ui-elements/buttons'/LineButton";
import { Link } from "react-router-dom";

const ListTexts = () => {
    const texts = useAppSelector(state => state.text.texts)
    const textsStatus = useAppSelector(state => state.text.status)

    if(textsStatus === 'pending'){
        return <Loading />
    }
    return (
        <section className={`${styleTW.containerWide}`}>
            <div className="flex gap-8 items-center">
                <h1 className={`${styleTW.title1} md:my-8`}>Texts</h1>
                <div>
                    <LineButton>
                        <Link to="/texts/add">Add text</Link>
                    </LineButton>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6 md:mt-12">
            {
                texts.map(t => <PreviewText text={t} key={t.textId}/>)
            }
            </div>
        </section>
    );
}



export default ListTexts;