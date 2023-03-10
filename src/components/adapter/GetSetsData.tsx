import useGetDataForSet from "../../hooks/useGetDataForSet";
import { Set, WordDb } from "../../pages/types/word";
import CardPreview from "../ui-elements/cards/CardPreview";
import {useEffect} from 'react'


interface Props {
    set: Set
}
const GetSetsData = ({set}: Props) => {
    const setData = useGetDataForSet(set)
    let words = (setData.words as WordDb[]).map(w => w.word)
    const text = setData.text[0]
    let content = text.text ? text.text : words.join(' ')

    const link = `/sets/${set.setId}`

    return <CardPreview content={content} link={link} title={set.name} wordsIds={set.wordsIds}/>;
}

export default GetSetsData;