import { Text } from '../../pages/types/word';
import CardPreview from '../ui-elements/cards/CardPreview';

interface Props {
    text: Text
}
const PreviewText = ({text}:Props) => {
    const link = `/texts/${text.textId}`
    
    return (
        <CardPreview title={text.title} link={link} wordsIds={text.wordsIds} content={text.text} />
    )
}


export default PreviewText;