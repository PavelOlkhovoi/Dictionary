import FastAddWord from "../../components/fastWords/FastAddWord";
import Loading from "../../components/Loading";
import MyInput from "../../components/wordsForm/ui/MyInput";
import { useAppSelector } from "../../hooks/redux-hooks";
import useInput from "../../hooks/useInput";
import { styleTW } from "../../style";


const AddSet = () => {
    const words = useAppSelector(state => state.word.words)
    const wordsStatus = useAppSelector(state => state.word.status)
    const texts = useAppSelector(state => state.text.texts)
    const textsStatus = useAppSelector(state => state.text.status)
    const uid = useAppSelector(state => state.user.userFake)
    const uidStatus = useAppSelector(state => state.user.status)

    const name = useInput('')

    if(wordsStatus === 'pending' || textsStatus === 'pending' || uidStatus === 'pending'){
        return <Loading />
    }


    return (
        <section className={styleTW.container}>
            <h1 className={`${styleTW.title1} mt-8`}>Add new set</h1>
            <div className="p-8">
                <FastAddWord />
            </div>
        </section>
    )
}

export default AddSet;