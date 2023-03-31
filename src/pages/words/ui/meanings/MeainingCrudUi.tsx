import MyInput from "../../../../components/wordsForm/ui/MyInput";
import { PartOfSpeechSelect } from "../../../types/word";
import DeleteBtn from "../../wordsSteps/uiFields/DeleteBtn";
import SelectPartOfSpeech from "../../wordsSteps/uiFields/SelectPartOfSpeech";
import { TranslationFieldsTest } from "../../wordsSteps/uiFields/TranslationFields";
import { DeleteBtnIds } from "../../../types/word";
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
    addGroup
}: Props) => {
    return (
        <div>
            <SelectPartOfSpeech 
            value={typeOfGroup} 
            formId={groupId} 
            groupId={groupId}
            handleOption={handleGroupe}
            deleteBtn={<DeleteBtn deleteHandler={deleteGroup} idsBtn={{idMain: groupId}}/> }
            />
            {
                translation.filter(t => t.show).map(t => {
                    return <div key={t.id} className="w-full py-2 mb-2 relative">
                        <MyInput
                        label="meaning"   
                        name="meaning"
                        value={t.name}
                        onChange={(e) => handleTranslation(t.id, groupId, e.target.value)}   
                        />
                        <div className="absolute bottom-10 right-0">
                            <DeleteBtn deleteHandler={deleteTranslation} idsBtn={{idMain: groupId, idEmbedded: t.id}} />
                        </div>
                    </div>
                })
            }
            <div>
                <LineButton onClick={() => addTranslation(groupId)}>Add translation</LineButton>
            </div>
            <div>
                <LineButton onClick={addGroup} color="green">Add group</LineButton>
            </div>
        </div>
    )
}

export default MeainingCrudUi;