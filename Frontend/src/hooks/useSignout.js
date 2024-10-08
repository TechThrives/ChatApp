import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signout = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signout`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signout };
};
export default useSignout;
