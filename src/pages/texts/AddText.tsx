import {useEffect, useState} from 'react';
import useInput from '../../hooks/useInput';
import MyInput from '../../components/wordsForm/ui/MyInput';
import { styleTW } from '../../style';
import MyButton from '../../components/wordsForm/ui/MyButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import Loading from '../../components/Loading';


const AddText = () => {
    const tags = useAppSelector(state => state.tag.tags)
    const dispatch = useAppDispatch()
    const tagsStatus = useAppSelector(state => state.tag.status)
    const name = useInput('')
    const [text, setText] = useState('')

    if( tagsStatus === 'pending' ){
        return <Loading />
    }
    return (
        <section className='container mx-auto lg:max-w-[800px]'>
            <div className='p-8'>
                <div className='my-8'>
                    <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mb-8'>Add your text</h1>
                    <MyInput value={name.value} onChange={name.onChange} label='name' name="text name"/>
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
                <div className='my-8'>
                    {
                        tags.map(tag => <div key={tag.tagId} className={`${styleTW.bageBlue} mt-3`}>{tag.name}</div>)
                    }
                </div>
            </div>
        </section>
    );
}


export default AddText;