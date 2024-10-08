import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser } = useAuthContext();
	return (
		< >
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/signin"} />} />
				<Route path='/signin' element={authUser ? <Navigate to='/' /> : <SignIn />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
