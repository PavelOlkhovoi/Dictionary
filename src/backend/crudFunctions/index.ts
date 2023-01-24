import { collection, addDoc, serverTimestamp, collectionGroup, query, where, setDoc, getDocs, doc, getDoc,
    updateDoc, arrayUnion} from "firebase/firestore";
import { db } from "../..";

export const createTag = async (uid: string, tagField: string, wordIdx: string) => {
    try {
        const docRef = await addDoc(collection(db, "tags"), {
          userId: uid,
          name: tagField,
          word_id: [wordIdx]
        });
        console.log("Tag Document written with ID: ", docRef.id);
      setDoc(docRef, {tagId: docRef.id}, {merge: true})

      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const addWordIdxToTag = async (tagId: string, wordIdx: string) => {
    const tagRef = doc(db, "tags", tagId);
    await updateDoc(tagRef, {
        word_id: arrayUnion(wordIdx)
    })
}