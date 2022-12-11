import TagsConstructor from "../../components/wordsForm/expiriment/TagsConstructor";

const Words = () => {
    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <h2>All tags</h2>
            <TagsConstructor />
        </div>
    );
}

export default Words;