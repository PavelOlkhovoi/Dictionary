import { collection, addDoc } from "firebase/firestore"; 
import { useState, useEffect } from "react";
import { db } from "../..";
import { IExample, Meaning } from '../types/word';


const AddWord = () => {
    
    
    const addNewWord = async () => {
        try {
            const docRef = await addDoc(collection(db, "testWords"), {
              word: 'word',
              meaning: 'meanings',
              tags: 'tags',
              examples: 'examples'
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    return (
        <section>
            <div>

                <button onClick={addNewWord}>Save a new word </button>
            </div>
        </section>
    );
}


export default AddWord;