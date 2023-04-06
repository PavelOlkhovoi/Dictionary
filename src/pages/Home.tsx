import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "..";
import { useAppSelector } from "../hooks/redux-hooks";
import { styleTW } from "../style";
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
      <header className="App-header transform">
        <h1 className={`${styleTW.title3}`}>Sign up using your Google account</h1>
       <div className="flex justify-center items-center gap-4 mt-6">
       <button onClick={handleAuth} className="text-base rounded border py-2 px-4">Sign up with Google</button>
        <button onClick={logout} className="text-base rounded border py-2 px-4">Logout</button>
       </div>
      </header>
</div>
    )
}

export default Home;