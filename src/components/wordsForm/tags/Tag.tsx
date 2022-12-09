import {useState, FC} from 'react'
import useInput from '../../../hooks/useInput';

interface Props {
    addNewTagToArr: React.Dispatch<React.SetStateAction<string[]>>,
    deleteTag: Function,
    componentId: number
}

const Tag: FC<Props> = ({addNewTagToArr, deleteTag, componentId}) => {
    const tag = useInput('')

 
    const [lastValue, setLastValue] = useState<string>('')
    
    
    function handleDeleteTag(){

        addNewTagToArr(tags => {

            const pureArr = [...tags]

            const test = pureArr.filter(t => t !== tag.value )

            return test
        })
        deleteTag(componentId)
    }


    function handleSaveTag(){



        addNewTagToArr(tags => {
            const valueTrimmed = tag.value.trim()

            const isNewTag = tags.includes(valueTrimmed)

            console.log('Last value', lastValue)

   
            if(valueTrimmed.length === 0 || isNewTag){
                return tags
            }

            if(lastValue.length !== 0){
                const pureArr = [...tags]
                const index = pureArr.indexOf(lastValue)

                console.log('insideLastValue', tag.value)
                pureArr[index] = tag.value.trim()

                setLastValue(valueTrimmed)

                return pureArr
            }

            setLastValue(valueTrimmed)



            // // pureArr[componentId] = tag.value

            return [...tags, valueTrimmed]

             
        })
    }

    return (
        <div>
            <input value={tag.value} onChange={tag.onChange} placeholder="tag"/>
            <button onClick={handleSaveTag}>Save</button>
            <button onClick={handleDeleteTag}>Delete</button>
        </div>
    )
}

export default Tag;