import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';
import { auth } from "..";

const provider = new GoogleAuthProvider();

const Home = () => {
const user = auth.currentUser;

const [activeUser, setActiveUser] = useState(user)

useEffect(()=> {
  console.log("User Effects", user)
}, [user])


const handleAuth = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

const logout = () => {
  signOut(auth).then(() => {
    console.log('Sign-out successful')
  }).catch((error) => {
    console.log('An error happened!', error)
  });
}
    return (
        <div className="App">
      <header className="App-header">
        <button onClick={handleAuth}>Google auth</button>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <section>
        <h1>User Data</h1>
        {
          user && 
          <div>
            Username: {user.displayName}
            <img src={user.photoURL ? user.photoURL : 'no foto'} alt="" />
          </div>
        }

      </section>
    </div>
    )
}

export default Home;