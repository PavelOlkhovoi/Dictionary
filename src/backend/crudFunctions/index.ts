import { collection, addDoc, setDoc, doc, updateDoc, arrayUnion} from "firebase/firestore";
import { db } from "../..";
import { Tag } from "../../pages/types/word";
import { store } from "../../store";
import { addTag, addWordToTag } from "../../store/slices/tagSlice";


export const createTag = async (uid: string, name: string, wordIdx: string) => {
    try {
        const docRef = await addDoc(collection(db, "tags"), {
          userId: uid,
          name: name,
          word_id: [wordIdx]
        });
        setDoc(docRef, {tagId: docRef.id}, {merge: true})

        console.log("Tag Document written with ID: ", docRef.id)
        store.dispatch(addTag({
          tagId: docRef.id,
          userId: uid,
          name: name,
          word_id: [wordIdx]
        }))

        return docRef.id
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const addWordIdxToTag = async (tagId: string, wordIdx: string) => {
    const tagRef = doc(db, "tags", tagId);
    await updateDoc(tagRef, {
        word_id: arrayUnion(wordIdx)
    })

    store.dispatch(addWordToTag({tagId: tagId, wordId: wordIdx}))
}

export const createOrUpdateTag = (name: string, wordId: string, tags: Tag[], uid: string) => {
  const isTagExist = tags.find(tag => tag.name === name)

  if(isTagExist){
    addWordIdxToTag(isTagExist?.tagId, wordId)
  }{
    createTag(uid, name, wordId)
  }
}