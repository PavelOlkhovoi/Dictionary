import {useState, FC} from 'react'
import { IExample } from '../../pages/types/word'

interface Props {
    save: Function,
    deleteExample: Function
}

const Example:FC<Props> = ({save, deleteExample}) => {
    const [example, setExample] = useState<IExample>({
        temId: new Date().getTime(),
        sentence: '',
        translation: ''
    })

    function handleSentence(e: React.ChangeEvent<HTMLInputElement>){
        setExample({
            ...example,
            sentence: e.target.value
        })
    }

    function handleTranslation(e: React.ChangeEvent<HTMLInputElement>){
        setExample({
            ...example,
            translation: e.target.value
        })
    }

    return (
        <div>
            <input value={example.sentence} onChange={handleSentence}  placeholder='example'/>
            <input value={example.translation} onChange={handleTranslation}  placeholder='translation'/>
            <button onClick={() => save(example)}>Save example</button>
            <button onClick={() => deleteExample(example)}>Delete example</button>
        </div>
    );
}

export default Example;