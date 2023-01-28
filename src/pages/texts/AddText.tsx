import {useEffect, useState} from 'react';
import useInput from '../../hooks/useInput';
import MyInput from '../../components/wordsForm/ui/MyInput';
import { styleTW } from '../../style';
import MyButton from '../../components/wordsForm/ui/MyButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import Loading from '../../components/Loading';
import { ifCompoundWords } from '../../backend/crudFunctions/text';


const AddText = () => {
    const tags = useAppSelector(state => state.tag.tags)
    const words = useAppSelector(state => state.word.words)
    const dispatch = useAppDispatch()
    const tagsStatus = useAppSelector(state => state.tag.status)
    const wordStatus = useAppSelector(state => state.word.status)
    const name = useInput('')
    const [text, setText] = useState('')
    const arrSimpleWords: string[] = []
    const arrСompoundWords: string[] = []

    words && words.forEach(word => {
        if(word.word.split(' ').length > 1 ){
            arrСompoundWords.push(word.word)
        }else {
            arrSimpleWords.push(word.word)
        }
    })

    const testWatcher = (button: string) => {
        if(button === ' '){
            setText(text.replace('dog', 'cat'))
        }
    }

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
                <div>
                    <p>
                    {/* {
                        text.split(' ').map((w, idx) => {
                            if(arrWord.includes(w)){
                                return <span className='bg-yellow-400' key={idx}>{w} </span>
                            }
                            else {
                                return <>{w} </>
                            }
                        })
                    } */}
                    {
                        text.split(' ').map((w, idx) => {
                            if(arrSimpleWords.includes(w)){
                                return <span className='bg-yellow-400' key={idx}>{w} </span>
                            }else {
                                return <>{w} </>
                            }
                        }).map((w, idx) => {
                            const tesOne = ifCompoundWords(text, arrСompoundWords);
                            console.log('first', tesOne, idx)
                                if(tesOne.length > 1){
                                    if(tesOne[0] === idx || tesOne[1] === idx){
                                        return <span className='bg-yellow-400' key={idx}>{w} </span>
                                    }else {
                                        return <>{w} </>
                                    }
                                }
                            })
                    }
                    </p>
                </div>
                <textarea className={`${styleTW.shadow} mb-8`} name="text" 
                value={text}
                onChange={(e)=> setText(e.target.value)}
                rows={10}
                onKeyUp={(e)=> testWatcher(e.key)}
                />

                {/* <div contentEditable={true}>
                    Ahdjk jsclks
                    <span className='bg-yellow-400'>Trrrr</span>
                </div> */}
                <MyButton color='green'>Add text</MyButton>
        </div>
        </section>
    );
}


export default AddText;