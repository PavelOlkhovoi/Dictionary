import {useEffect, useState} from 'react';
import useInput from '../../hooks/useInput';
import MyInput from '../../components/wordsForm/ui/MyInput';
import { styleTW } from '../../style';
import MyButton from '../../components/wordsForm/ui/MyButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import Loading from '../../components/Loading';


const AddText = () => {
    const tags = useAppSelector(state => state.tag.tags)
    const words = useAppSelector(state => state.word.words)
    const dispatch = useAppDispatch()
    const tagsStatus = useAppSelector(state => state.tag.status)
    const wordStatus = useAppSelector(state => state.word.status)
    const name = useInput('')
    const [text, setText] = useState('')

    if( tagsStatus === 'pending'  || wordStatus  === 'pending'){
        return <Loading />
    }
    return (
        <section className='container mx-auto lg:max-w-[800px]'>
            <div className='p-8'>
                <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mb-8'>Add your text</h1>
                <MyInput value={name.value} onChange={name.onChange} label='name' name="text name"/>
                <div className='my-8'>
                    <h3 className="block mb-2 mt-8 text-sm font-medium text-gray-700 undefined">
                        Hints
                    </h3>
                {
                    tags.map(tag => <div key={tag.tagId} className={`${styleTW.bageBlue} mt-3`}>{tag.name}</div>)
                }
                </div>
                <label htmlFor=""className="block mb-2 mt-8 text-sm font-medium text-gray-700 undefined">
                    Type you text
                </label>
                <textarea className={`${styleTW.shadow} mb-8`} name="text" 
                value={text}
                onChange={(e)=> setText(e.target.value)}
                rows={10}
                />
                <MyButton color='green'>Add text</MyButton>
        </div>
        </section>
    );
}


export default AddText;