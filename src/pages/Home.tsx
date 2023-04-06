import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "..";
import { useAppSelector } from "../hooks/redux-hooks";
// import { useMyAuth } from "../hooks/useMyAuth";


const provider = new GoogleAuthProvider();

const Home = () => {

const words = useAppSelector(state => state.word)

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
        // activeUser && 
        <div>
          {/* Username: {activeUser.email} */}
          {/* <img src={activeUser.photoURL ? activeUser.photoURL : 'no foto'} alt="" /> */}
        </div>
      }

    </section>
</div>
    )
}

export default Home;