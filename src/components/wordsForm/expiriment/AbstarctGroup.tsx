import SingleExample from './examples/SingleExample'
import { ISingleWord } from './GroupOfWords';
import { InputExamples } from '../../../pages/types/word';

interface Props {
    typeOfField: 'examples' | 'simple';
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


    return (
        <div>
            {rows}
        </div>
    );
}

export default AbstarctGroup;