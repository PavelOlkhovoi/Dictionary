import SingleExample from './examples/SingleExample'
import { ISingleWord } from '../../../pages/types/word';
import { InputExamples } from '../../../pages/types/word';
import SingleWord from './SingleWord';

interface Props {
    typeOfField: 'examples' | 'single';
    fieldsObject: InputExamples[] | ISingleWord[];
    deleteField: Function;
    saveField: Function
}

const AbstarctGroup = ({fieldsObject, typeOfField, deleteField, saveField}: Props) => {
    
    const rows: JSX.Element[] = []

    if(typeOfField === 'examples'){
        (fieldsObject as InputExamples[]).forEach(item => {
            rows.push(<SingleExample 
                key={item.temId}
                deleteField={deleteField}
                fieldObject={item}
                saveField={saveField}
            />)
        })
    }

    if(typeOfField === 'single'){
        (fieldsObject as ISingleWord[]).forEach(item => {
            rows.push(<SingleWord
                key={item.temId}
                deleteField={deleteField}
                wordData={item}
                saveField={saveField}
                place={'tag'}
            />)
        })
    }


    return (
        <div>
            {rows}
        </div>
    );
}

export default AbstarctGroup;