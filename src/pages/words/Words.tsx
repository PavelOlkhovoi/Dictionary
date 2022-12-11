import ExamplesConstructor from "../../components/wordsForm/expiriment/examples/ExamplesConstructor";
import GroupOfExamples from "../../components/wordsForm/expiriment/examples/groupOfExamples";
import TagsConstructor from "../../components/wordsForm/expiriment/TagsConstructor";

const Words = () => {
    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            {/* <TagsConstructor /> */}
            <ExamplesConstructor/>
        </div>
    );
}

export default Words;