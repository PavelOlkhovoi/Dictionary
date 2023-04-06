import { styleTW } from "../style";
import useAuthHook from "../hooks/useAuthHook";

const Home = () => {

  const {handleAuth, logout} = useAuthHook()

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