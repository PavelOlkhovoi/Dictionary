import { createTag } from "../../backend/crudFunctions/tag";

const AddWord = () => {

    const user = {uid: '1234'}


    const addTags = async (wordIdx: string) => {

      await createTag(user.uid, 'test', wordIdx)
          
  }

    return (
        <section style={{
          maxWidth: '600px',
          margin: '0 auto'
          }}>
        </section>
    );
}


export default AddWord;