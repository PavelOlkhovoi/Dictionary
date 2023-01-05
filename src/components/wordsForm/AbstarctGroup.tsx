import SingleExample from './examples/SingleExample'
import { ISingleWord, Meaning } from '../../pages/types/word';
import { InputExamples } from '../../pages/types/word';
import SingleWord from './SingleWord';
import SingleMeaningConstructor from './meanings/SingleMeaningConstructor';

interface Props {
    typeOfField: 'examples' | 'single' | 'meanings';
    fieldsObject: InputExamples[] | ISingleWord[] | Meaning[];
    deleteField: Function;
    saveField?: Function;
    place?: string
    groupId?: number,
    name?: string,
    label?: string
}

const AbstarctGroup = ({
    fieldsObject, 
    typeOfField, 
    deleteField, 
    saveField, 
    place, 
    groupId,
    label,
    name,
}: Props) => {
    
    const rows: JSX.Element[] = []

    if(typeOfField === 'examples'){
        (fieldsObject as InputExamples[]).forEach(item => {
            rows.push(<SingleExample 
                key={item.temId as number}
                deleteField={deleteField}
                fieldObject={item}
                saveField={saveField as Function}
            />)
        })
    }

    if(typeOfField === 'single'){
        (fieldsObject as ISingleWord[]).forEach(item => {
            rows.push(<SingleWord
                key={item.temId as number}
                deleteField={deleteField}
                wordData={item}
                saveField={saveField as Function}
                place={(place as string)}
                label={(label as string)}
                name={name as string}
            />)
        })
    }

    if(typeOfField === 'meanings'){
        (fieldsObject as Meaning[]).forEach(item => {
            rows.push(<SingleMeaningConstructor
                key={item.tempId as number}
                singleGroup={item}
                deleteGroup={deleteField}
                saveGroupedMeaning={saveField as Function}
                groupId={groupId as number}
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