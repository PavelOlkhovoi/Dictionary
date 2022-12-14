import ExamplesConstructor from "../../components/wordsForm/expiriment/examples/ExamplesConstructor";
import MeaningsConstructor from "../../components/wordsForm/expiriment/meanings/MeaningsConstructor";
import MeaningsCover from "../../components/wordsForm/expiriment/meanings/MeaningsCover";
import TagsConstructor from "../../components/wordsForm/expiriment/TagsConstructor";


const Words = () => {
        
    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <MeaningsCover />
            <br />
            <br />
            <br />
            <TagsConstructor />
            <br />
            <br />
            <br />
            <ExamplesConstructor/>
        </div>
    );
}

export default Words;