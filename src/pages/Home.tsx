import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { auth } from "..";
import { useMyAuth } from "../hooks/useMyAuth";

const provider = new GoogleAuthProvider();

const Home = () => {
const user1 = auth.currentUser;
const reduxUser = useMyAuth()

const authMonitor = async () => {
  onAuthStateChanged(auth, user => {
    if(user){
      console.log('IFFF', user)
      setActiveUser(user)
    }
    else {
      console.log('Else', user)
    }
  })
}

authMonitor()

const [activeUser, setActiveUser] = useState(user1)

useEffect(()=> {
  console.log("User Effects", activeUser)
}, [activeUser])

useEffect(()=> {
  console.log("Reduxuser", reduxUser)
}, [reduxUser])


const handleAuth = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
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
        activeUser && 
        <div>
          Username: {activeUser.displayName}
          <img src={activeUser.photoURL ? activeUser.photoURL : 'no foto'} alt="" />
        </div>
      }

    </section>
</div>
    )
}

export default Home;