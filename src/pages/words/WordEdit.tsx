import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import MyButton from '../../components/wordsForm/ui/MyButton'
import MyInput from '../../components/wordsForm/ui/MyInput'
import EditMeanings from '../../components/edit/word/EditMeanings'
import { db } from '../..';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ExampleForServer } from '../types/word';
import { firstCapitalLetter } from '../../helpers/display'
import { styleTW } from '../../style'
import Loading from '../../components/Loading'
import EditAllTags from '../../components/edit/word/EditAllTags'
import EditExample from '../../components/edit/word/EditExample'
import AddNewTag from '../../components/edit/word/AddNewTag'
import { updateWord } from '../../store/slices/wordSlice'
import { updateExamplex } from '../../store/slices/wordSlice'

const WordEdit = () => {
    const { idword } = useParams()
    const dispatch = useAppDispatch()
    const currentWord = useAppSelector(state => state.word.words.find(w => w.wordId === idword))
    const wordStatus = useAppSelector(state => state.word.status)
    const tagStatus = useAppSelector(state => state.tag.status)
    const tags = useAppSelector(state => state.tag.tags.filter(tag => tag.word_id.includes(idword as string)))

    const [word, setWord] = useState('')

    const wordRef = doc(db, "words", idword as string);
    
    const wordUpdate = async () => {
        try {
            await updateDoc(wordRef, {
                word: word
            });
            idword && dispatch(updateWord({id: idword, newWord: word}))

            
              console.log("Tag Document written with ID: ", wordRef);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
    
    const examplesUpdate = async (updatedExamples: ExampleForServer[]) => {
        try {
            await updateDoc(wordRef, {
                examples: updatedExamples
              });
              idword && dispatch(updateExamplex({id: idword, examples: updatedExamples}))
        } catch (error) {
            console.error("Error examples document: ", error);
        }
    }
    
    const deleteWord = async () => {
        await deleteDoc(wordRef);
    }

    if( wordStatus === 'pending' || tagStatus === 'pending' || !currentWord ){
        return <Loading />
    }

    return <section
        className="container max-w-screen-lg mx-auto px-4 mt-5">
        <div className='sm:flex gap-8 items-center'>
        <MyInput
            edit={true}  
            name='word' 
            label='Word' 
            placeholder={firstCapitalLetter(currentWord.word)} 
            onChange={(e)=> setWord( prev => e.target.value)}
            editFunct={wordUpdate}
            />
        <MyButton onClick={deleteWord} color="red">Delete word</MyButton>
        </div>
        <dl className={styleTW.gridDl}>
            <dt>Level:</dt>
            <dd>{currentWord.level}</dd>
            </dl>
        <h2 className={styleTW.title2}>Meanings</h2>
        {
            currentWord.meaning &&
            <EditMeanings wordId={idword as string} oldMeanings={currentWord.meaning}/>
        }
        <div>
        <h2 className={styleTW.title2}>Examples</h2>
            {
                currentWord.examples && currentWord.examples.length !== 0 && 
                <EditExample allExamples={currentWord.examples} exampleUpdate={examplesUpdate}/>
            }
        </div>
        <div className='flex items-center'>
        <h2 className="my-4 text-4xl">Tags</h2>
            {
                <EditAllTags wordId={idword as string} />
            }
        </div>
        {
            <AddNewTag wordIdx={idword as string} />
        }
    </section>
}

export default WordEdit;