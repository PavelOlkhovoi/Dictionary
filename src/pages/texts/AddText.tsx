import {useEffect, useState, useRef} from 'react';
import useInput from '../../hooks/useInput';
import MyInput from '../../components/wordsForm/ui/MyInput';
import { styleTW } from '../../style';
import { useAppSelector } from '../../hooks/redux-hooks';
import Loading from '../../components/Loading';
import ShowTagWithWords from '../../components/tags/ShowTagWithWords';
import { AllWordsSorted } from '../../types/word';
import TextHighlighter from '../../components/text/TextHighlighter';
import { createText } from '../../backend/crudFunctions/text';
import Notification from '../../components/ui-elements/Notification';
import useValidation from '../../hooks/useValidation';
import Validate from '../../components/validations/Validate';
import { isEmpty } from 'react-redux-firebase';

interface Props {
    setId?: string | null
    titleMode?: 'h2'
}

const AddText = ({setId = null, titleMode}:Props) => {
    const tags = useAppSelector(state => state.tag.tags)
    const words = useAppSelector(state => state.word.words)
    const uid = useAppSelector(state => state.user.userFake?.uid)
    const tagsStatus = useAppSelector(state => state.tag.status)
    const wordStatus = useAppSelector(state => state.word.status)
    const title = useInput('')
    const [text, setText] = useState('')
    const [usedWords, setUsedWords] = useState<AllWordsSorted[]>([])
    
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const resizeTextArea = () => {
        (textAreaRef.current as HTMLTextAreaElement).style.height = "auto";
        (textAreaRef.current as HTMLTextAreaElement).style.height = (textAreaRef.current as HTMLTextAreaElement).scrollHeight + "px";
    };

    const titleStyle = titleMode === 'h2' ? styleTW.title2 : styleTW.title1
    const adjustMargin = titleMode === 'h2' ? styleTW.title2 : styleTW.title1

    useEffect(resizeTextArea, [text]);

    const [validated , setValidated ] = useState({
        isValid: false,
        showTitleError: false,
        showTextError: false
    })

    const message = 'The text has been successfully added'

    const addTextHandler = async (words: AllWordsSorted[]) => {
        const ids: string[] = words.map(w => w.wordId)
        const response = await createText(title.value, text, ids, uid as string, setId)
    }

    const wordsBack = (words: AllWordsSorted[]) => {
        setUsedWords(words)
        addTextHandler(words)
        setValidated(prev => ({...prev, isValid: true}))

        title.setInput('')
        setText('')
    }


    if( tagsStatus === 'pending'  || wordStatus  === 'pending'){
        return <Loading />
    }


    return (
        <section className={`${styleTW.containerWide} mb-40`}>
            <div className={titleMode === 'h2' ? '-mt-8' : ''}>
                <div className={`${styleTW.title1} mb-8`}>
                    <h1 className={`${titleStyle}`}>Add text</h1>
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
                <label htmlFor=""className="block mb-1 mt-8 text-sm font-medium text-gray-700">
                    Type text
                </label>
                <Validate value={text} pattern={{minLength: 20, isEmpty: true}} show={validated.showTextError}/>
                <TextHighlighter text={text} words={words} wordsBack={wordsBack} textButton='Add text'>
                    <textarea 
                    className={`${styleTW.inputLine} overflow-hidden`} 
                    name="text" 
                    value={text}
                    onChange={(e)=> setText(e.target.value)}
                    onBlur={()=> setValidated(prev => ({
                        ...prev,
                        isValid: false,
                        showTextError: true
                    }))}
                    rows={1}
                    ref={textAreaRef}
                    />
                </TextHighlighter>
        </div>
        {validated.isValid && <Notification message={message} stopShowing={()=> console.log('Callback for notification')}/>}
        </section>
    );
}


export default AddText;