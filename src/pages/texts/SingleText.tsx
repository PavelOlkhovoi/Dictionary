import {Link, useParams} from 'react-router-dom'
import Loading from '../../components/Loading';
import { useAppSelector } from '../../hooks/redux-hooks';
import { selectWordsArrById } from '../../store/slices/wordSlice';
import { styleTW } from '../../style';
import MyButton from '../../components/wordsForm/ui/MyButton';


const SingleText = () => {
    const {idtext} = useParams()
    const text = useAppSelector(state => state.text.texts.find(text => text.textId === idtext))
    const words = useAppSelector(state => selectWordsArrById(state, text?.wordsIds as string[]))
    const textsStatus = useAppSelector(state => state.text.status)

    if(textsStatus === 'pending'){
        <Loading />
    }


    return <div className={`${styleTW.container} p-8`}>
        <div className='flex gap-3'>
            <h1 className={`${styleTW.title1}`}>{text?.title}</h1>
            <MyButton>
                <Link to={{pathname: `/texts/edit/${idtext}`}}>Edit</Link>
            </MyButton>
        </div>
        {
            words?.map(w => <div key={w.wordId}>{w.word}</div>)
        }
        <div className='my-8'>
            {
                text?.text.split(' ').map((tw, idx) => {
                    const compaundWords: string[] = []
                    const simpleWorlds: string[] = []
                    words?.forEach(w => w.word.split(' ').length > 1 ? compaundWords.push(w.word) : simpleWorlds.push(w.word))
   

                    if(compaundWords.some(w => w.split(' ').includes(tw.replace('.', '')))){
                        return <span key={tw + idx} className="bg-blue-400">{tw} </span>
                    }
                    if(simpleWorlds.some(w => w.includes(tw.replace('.', '')))){
                        return <span key={tw + idx} className="bg-yellow-400">{tw} </span>
                    }
                        return <span key={tw + idx}>{tw} </span>
                   })
            }
        </div>
    </div>;
}


export default SingleText;