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
}

const AbstarctGroup = ({fieldsObject, typeOfField, deleteField, saveField, place, groupId}: Props) => {
    
    const rows: JSX.Element[] = []

    if(typeOfField === 'examples'){
        (fieldsObject as InputExamples[]).forEach(item => {
            rows.push(<SingleExample 
                key={item.temId}
                deleteField={deleteField}
                fieldObject={item}
                saveField={saveField as Function}
            />)
        })
    }

    if(typeOfField === 'single'){
        (fieldsObject as ISingleWord[]).forEach(item => {
            rows.push(<SingleWord
                key={item.temId}
                deleteField={deleteField}
                wordData={item}
                saveField={saveField as Function}
                place={(place as string)}
            />)
        })
    }

    if(typeOfField === 'meanings'){
        (fieldsObject as Meaning[]).forEach(item => {
            rows.push(<SingleMeaningConstructor
                key={(item.tempId)}
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