import { useState } from "react";
import { Link } from "react-router-dom";
import useSignin from "../../hooks/useSignin"; 
import Logo from '../../assets/logo.png'; 

const SignIn = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { loading, signin } = useSignin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(""); 
		await signin(username, password); 
	};

	return (
		<section className="bg-gray-50">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full ">
				<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 sm:p-8 md:space-y-6">
					<div className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900">
					<img className="w-16 h-16 mr-2" src={Logo} alt="logo" /> {/* Use your logo image here */}
					ChatApp
				</div>
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
							Sign in to your account
						</h1>
						{error && <p className="text-red-500">{error}</p>} {/* Display error message */}
						<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
							<div>
								<label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
								<input 
									type="text" 
									name="username" 
									id="username" 
									value={username} 
									onChange={(e) => setUsername(e.target.value)} 
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
									placeholder="name@company.com" 
									required 
								/>
							</div>
							<div>
								<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
								<input 
									type="password" 
									name="password" 
									id="password" 
									value={password} 
									onChange={(e) => setPassword(e.target.value)} 
									placeholder="••••••••" 
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
									required 
								/>
							</div>
							<button 
								type="submit" 
								className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
								disabled={loading}
							>
								{loading ? "Loading..." : "Sign in"}
							</button>
							<p className="text-md font-medium text-gray-500">
								Don’t have an account yet? <Link to="/signup" className="font-semibold text-blue-600 hover:underline">Sign up</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SignIn;