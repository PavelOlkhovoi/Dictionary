import { collection, addDoc, setDoc, query, where, getDocs, updateDoc, doc, arrayUnion} from "firebase/firestore";
import { db } from "../..";
import { store } from "../../store";
import { Text } from "../../pages/types/word";
import { addText, updateText } from "../../store/slices/textSlice";
import { addTextIdToTextArr } from "./set";

export const createText = async (title: string, text: string, wordsIds: string[], uid: string, setId: string | null = null) => {
    try {
        const docRef = await addDoc(collection(db, "text"), {
          title,
          text,
          wordsIds,
          uid,
        });

        setDoc(docRef, {textId: docRef.id}, {merge: true})
        store.dispatch(addText({
            title,
            text,
            wordsIds,
            uid,
            textId: docRef.id
        }))

        console.log("Text Document written with ID: ", docRef.id)
        setId && addTextIdToTextArr(setId, docRef.id)
        return docRef.id
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const fetchUserTexts = async (uid: string) => {
    try {
        const docRef = collection(db, "text");
        const query_ = query(docRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(query_);

        const allText = [] as Text[]
        querySnapshot.forEach((doc) => {
            allText.push(doc.data() as Text)
        });

        return allText
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const updateUserText = async (textId: string, wordsIds: string[], text: string, title: string, uid: string) => {
  try {
    console.log("Start updateRespond")
    const textRef = doc(db, "text", textId);
    const res = await updateDoc(textRef, {
      wordsIds: wordsIds,
      title,
      text
    })

    console.log("Respond", res)

    store.dispatch(updateText({
      title,
      text,
      wordsIds,
      uid,
      textId
    }))

    } catch (error) {
      console.log("Error Fail", error)
  }
}
