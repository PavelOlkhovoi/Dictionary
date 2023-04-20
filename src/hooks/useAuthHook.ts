import { signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import { auth } from "..";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

const useAuthHook = () => {

    const navigate = useNavigate()

    const handleAuth = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;
          navigate('/')
        }).catch((error) => {
            console.log('An error happened!', error)
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
          localStorage.removeItem("userLocal")
          navigate('/auth')
          window.location.reload()
        }).catch((error) => {
          console.log('An error happened!', error)
        });
      }
    return {
        handleAuth,
        logout
    };
}

export default useAuthHook;