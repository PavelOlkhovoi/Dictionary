import MyInput from "../../../../components/wordsForm/ui/MyInput";
import { PartOfSpeechSelect } from "../../../../types/word";
import DeleteBtn from "../../wordsSteps/uiFields/DeleteBtn";
import SelectPartOfSpeech from "../../wordsSteps/uiFields/SelectPartOfSpeech";
import { TranslationFieldsTest } from "../../wordsSteps/uiFields/TranslationFields";
import { DeleteBtnIds } from "../../../../types/word";
import LineButton from "../../../../components/ui-elements/buttons/LineButton";

interface Props {
    typeOfGroup: PartOfSpeechSelect
    translation: TranslationFieldsTest[]
    groupId: string
    handleGroupe: (idGroup: string, name: string) => void
    handleTranslation: (idTranslation: string, idGroup: string, name: string) => void
    deleteGroup: (idGroup: DeleteBtnIds) => void
    deleteTranslation: (ids: DeleteBtnIds) => void
    addTranslation: (idGroup: string) => void
    addGroup: () => void
    updateMeaningsDB: () => void
}
const MeainingCrudUi = ({
    typeOfGroup, 
    translation, 
    groupId, 
    handleGroupe, 
    handleTranslation, 
    deleteGroup,
    deleteTranslation,
    addTranslation,
    addGroup,
    updateMeaningsDB
}: Props) => {
    return (
        <div className="my-2">
        <div className="mt-4">
            <SelectPartOfSpeech 
                value={typeOfGroup} 
                formId={groupId} 
                groupId={groupId}
                handleOption={handleGroupe}
                deleteBtn={<DeleteBtn deleteHandler={deleteGroup} idsBtn={{idMain: groupId}}/> }
                />
           </div>
            {
                translation.filter(t => t.show).map(t => {
                    return <div key={t.id} className="w-full my-4 relative">
                        <MyInput
                        label="meaning"   
                        name="meaning"
                        value={t.name}
                        onChange={(e) => handleTranslation(t.id, groupId, e.target.value)}   
                        />
                        <div className="absolute bottom-2 right-0">
                            <DeleteBtn deleteHandler={deleteTranslation} idsBtn={{idMain: groupId, idEmbedded: t.id}} />
                        </div>
                    </div>
                })
            }
            <div className="my-2 flex flex-col gap-4 justify-start items-start">
                <LineButton onClick={() => addTranslation(groupId)}>Add translation</LineButton>
                <LineButton onClick={addGroup} color="blue">Add group</LineButton>
                <LineButton onClick={updateMeaningsDB} color="green">Save changes</LineButton>
            </div>
        </div>
    )
}

export default MeainingCrudUi;