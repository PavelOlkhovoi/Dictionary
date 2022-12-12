import ExamplesConstructor from "../../components/wordsForm/expiriment/examples/ExamplesConstructor";
import TagsConstructor from "../../components/wordsForm/expiriment/TagsConstructor";


const Words = () => {
        
    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <TagsConstructor />
            <br />
            <br />
            <br />
            <ExamplesConstructor/>
        </div>
    );
}

export default Words;