import {useEffect, useState} from 'react';
import useInput from '../../hooks/useInput';
import MyInput from '../../components/wordsForm/ui/MyInput';
import { styleTW } from '../../style';
import { useAppSelector } from '../../hooks/redux-hooks';
import Loading from '../../components/Loading';
import ShowTagWithWords from '../../components/tags/ShowTagWithWords';
import { AllWordsSorted } from '../types/word';
import TextHighlighter from '../../components/text/TextHighlighter';
import { createText } from '../../backend/crudFunctions/text';
import Notification from '../../components/ui-elements/Notification';
import useValidation from '../../hooks/useValidation';
import Validate from '../../components/validations/Validate';
import { isEmpty } from 'react-redux-firebase';

interface Props {
    setId?: string | null
}

const AddText = ({setId = null}:Props) => {
    const tags = useAppSelector(state => state.tag.tags)
    const words = useAppSelector(state => state.word.words)
    const uid = useAppSelector(state => state.user.userFake?.uid)
    const tagsStatus = useAppSelector(state => state.tag.status)
    const wordStatus = useAppSelector(state => state.word.status)
    const title = useInput('')
    const [text, setText] = useState('')
    const [usedWords, setUsedWords] = useState<AllWordsSorted[]>([])

    const [validated , setValidated ] = useState({
        isValid: false,
        showTitleError: false,
        showTextError: false
    })

    const message = 'The text has been successfully added'

    const addTextHandler = async (words: AllWordsSorted[]) => {
        const ids: string[] = words.map(w => w.wordId)
        // const response = await createText(title.value, text, ids, uid as string, setId)
    }

    const wordsBack = (words: AllWordsSorted[]) => {
        setUsedWords(words)
        addTextHandler(words)
        setValidated(prev => ({...prev, isValid: true}))

        // console.log('Test validation', titleValidation)

        // title.setInput('')
        // setText('')
    }



    if( tagsStatus === 'pending'  || wordStatus  === 'pending'){
        return <Loading />
    }


    return (
        <section className={styleTW.containerWide}>
            <div>
                <div className={`${styleTW.title1} ${styleTW.bottomBorder} pb-4 mb-8`}>
                    <h1 className={`${styleTW.title1}`}>Add text</h1>
                    <div></div>
                </div>
                <MyInput
                label='title' 
                name="title"
                value={title.value} onChange={title.onChange} onBlur={()=> setValidated(prev => ({
                    ...prev,
                    isValid: false,
                    showTitleError: true
                }))}/>

                <Validate value={title.value} pattern={{isEmpty: true}} show={validated.showTitleError} />

                <div className='my-8'>
                    <h3 className="block mb-2 mt-8 text-sm font-medium text-gray-700 undefined">
                        Hints
                    </h3>
                    <div className='flex flex-wrap'>
                    {
                        tags.map(tag => <ShowTagWithWords tag={tag} key={tag.tagId}/> )
                    }   
                    </div>
                </div>
                <label htmlFor=""className="block mb-2 mt-8 text-sm font-medium text-gray-700 undefined">
                    Type text
                </label>
                <Validate value={text} pattern={{minLength: 20, isEmpty: true}} show={validated.showTextError}/>
                <TextHighlighter text={text} words={words} wordsBack={wordsBack} textButton='Add text'>
                    <textarea className={`${styleTW.shadow} mb-8`} name="text" 
                    value={text}
                    onChange={(e)=> setText(e.target.value)}
                    onBlur={()=> setValidated(prev => ({
                        ...prev,
                        isValid: false,
                        showTextError: true
                    }))}
                    rows={10}
                    />
                </TextHighlighter>
        </div>
        {validated.isValid && <Notification message={message}/>}
        </section>
    );
}


export default AddText;