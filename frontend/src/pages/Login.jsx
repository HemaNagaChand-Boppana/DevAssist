import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "/home";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl text-white mb-6 font-bold">
          DevAssist 🚀
        </h1>

        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;