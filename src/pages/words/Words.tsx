import ExamplesConstructor from "../../components/wordsForm/expiriment/examples/ExamplesConstructor";
import MeaningsConstructor from "../../components/wordsForm/expiriment/meanings/MeaningsConstructor";
import TagsConstructor from "../../components/wordsForm/expiriment/TagsConstructor";


const Words = () => {
        
    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <MeaningsConstructor />
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