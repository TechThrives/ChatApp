import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversationsHistory = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const getConversationsHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/history`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setConversations(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversationsHistory();
  }, []);

  return { loading, conversations, getConversationsHistory };
};
export default useGetConversationsHistory;
