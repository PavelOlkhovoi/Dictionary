import {useState}from 'react'
import MyButton from '../../wordsForm/ui/MyButton'
import MyInput from '../../wordsForm/ui/MyInput'

interface Props {
    oldExample: string
    oldTranslation: string
    arrIdx: number
    rewriteFunction: Function
    deleteExample: Function
}

const EditSingleExample = ({oldExample = '', oldTranslation = '', arrIdx, rewriteFunction, deleteExample}: Props) => {
    const [example, setExample] = useState(oldExample)
    const [translation, setTranslation] = useState(oldTranslation)
    return (
        <div>
            <MyInput 
                name="example"
                label="Example"
                placeholder={example}
                onChange={(e)=> setExample(e.target.value)}
                value={example}

            />
            <MyInput 
                name="example"
                label="Example"
                placeholder={translation}
                onChange={(e)=> setTranslation(e.target.value)}
                value={translation}
            />
            <MyButton color="red" onClick={()=> deleteExample(arrIdx)}>Delete</MyButton>
            <MyButton color="green" 
                onClick={()=> rewriteFunction(arrIdx, {example, translation})}
            >Save changes</MyButton>
    </div>
    )
}


export default EditSingleExample;