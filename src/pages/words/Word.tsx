import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import { db } from '../..';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ExampleForServer } from '../types/word';
import { firstCapitalLetter } from '../../helpers/display';
import ShowMeanings from '../../components/wordsForm/singleWord/ShowMeanings';
import MyButton from '../../components/wordsForm/ui/MyButton';
import { styleTW } from '../../style';
import MyInput from '../../components/wordsForm/ui/MyInput';
import EditExample from '../../components/edit/word/EditExample';
import EditAllTags from '../../components/edit/word/EditAllTags';
import AddNewTag from '../../components/edit/word/AddNewTag';
import { useAppSelector } from '../../hooks/redux-hooks';

const Word = () => {
    const { idword } = useParams()
    const currentWord = useAppSelector(state => state.word.words.find(w => w.wordId === idword))
    const wordStatus = useAppSelector(state => state.word.status)
    const tagStatus = useAppSelector(state => state.tag.status)
    const tags = useAppSelector(state => state.tag.tags.filter(tag => tag.word_id.includes(idword as string)))
    
    const [isEdit, setIsEdit] = useState(false)

    const [word, setWord] = useState('')

    const wordRef = doc(db, "words", idword as string);
    
    const wordUpdate = async () => {
        await updateDoc(wordRef, {
          word: word
        });
    }
    
    const examplesUpdate = async (updatedExamples: ExampleForServer[]) => {
        await updateDoc(wordRef, {
          examples: updatedExamples
        });
    }
    
    const deleteWord = async () => {
        await deleteDoc(wordRef);
    }

    useEffect(()=> {
        console.log('isEdit', tags)
    }, [isEdit])

    if( wordStatus === 'pending' || tagStatus === 'pending' || !currentWord ){
        return (
            <div className='container mx-auto'>
                <button type="button" className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md h-2 disabled">
                    <svg className="motion-reduce:hidden animate-spin ..." viewBox="0 0 24 24">...</svg>
                    Loading...
                </button>
            </div>
        )
    }

    return (
        <section
        className="container max-w-screen-lg mx-auto px-4 mt-5"
        >
            <div className='sm:flex gap-8 items-center'>
                {
                    !isEdit ? <h1 className='text-6xl font-normal leading-normal mt-0 mb-2'>{firstCapitalLetter(currentWord.word)}</h1>
                    : <MyInput
                        edit={true}  
                        name='word' 
                        label='Word' 
                        placeholder={firstCapitalLetter(currentWord.word)} 
                        onChange={(e)=> setWord( prev => e.target.value)}
                        editFunct={wordUpdate}
                        />
                }
                
                <MyButton onClick={()=> setIsEdit(prev => !prev)}>Edit</MyButton>
                <MyButton onClick={deleteWord} color="red">Delete word</MyButton>
            </div>
            <dl className={styleTW.gridDl}>
                <dt>Level:</dt>
                <dd>{currentWord.level}</dd>
                </dl>
            <h2 className={styleTW.title2}>Meanings</h2>
            <ShowMeanings meanings={currentWord.meaning} isEdit={isEdit} wordId={idword as string}/>
            <div>
            <h2 className={styleTW.title2}>Examples</h2>
                {
                    currentWord.examples && currentWord.examples.length !== 0 && !isEdit && currentWord.examples.map(ex => {
                        return <div key={ex.example} className='my-4'>
                            <h3 className={styleTW.title3}>Example</h3>
                                <p> {ex.example}</p>
                            <h3 className={`${styleTW.title3} mt-2`}>Translation</h3>
                            <p>{ex.translation}</p>
                        </div>
                    })
                }
                {
                    currentWord.examples && currentWord.examples.length !== 0 && isEdit && 
                    <EditExample allExamples={currentWord.examples} exampleUpdate={examplesUpdate}/>
                }
            </div>
            <div className='flex items-center'>
            <h2 className="my-4 text-4xl">Tags</h2>
                {
                    !isEdit && tags.map(t => <div key={t.tagId}><span className={`${styleTW.bageBlue} mt-3 ml-5`}>{t.name}</span></div>)
                }
                {
                    isEdit && <EditAllTags wordId={idword as string} oldTags={tags}/>
                }
            </div>
            {
                isEdit && <AddNewTag wordIdx={idword as string} />
            }
                {/* <MyButton
                    onClick={()=> console.log('Save')}
                    color='green'
                >
                    Save changes
                </MyButton> */}
        </section>
    );
}

export default Word;