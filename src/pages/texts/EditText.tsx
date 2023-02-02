import {useParams} from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux-hooks'
import { styleTW } from '../../style'
import { selectWordsArrById } from '../../store/slices/wordSlice'
import Loading from '../../components/Loading'


const EditText = () => {
    const {idtext} = useParams()
    const text = useAppSelector(state => state.text.texts.find(text => text.textId === idtext))
    const words = useAppSelector(state => selectWordsArrById(state, text?.wordsIds as string[]))
    const textsStatus = useAppSelector(state => state.text.status)

    if(textsStatus === 'pending'){
        <Loading />
    }

    
    return (
        <section className={styleTW.container}>
            <h1 className={styleTW.title1}>{text?.title}</h1>
        </section>
    );
}

export default EditText;