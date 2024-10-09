import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import useGetConversations from "../hooks/useGetConversations";

const SearchInput = ({ setFilteredConversations }) => {
  const [search, setSearch] = useState("");
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredConversations = conversations.filter((conversation) =>
      conversation.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredConversations.length === 0) {
      toast.error("No conversations found!");
    } else {
      toast.success(`${filteredConversations.length} conversation(s) found`);
    }

    // Pass filtered conversations to parent component
    setFilteredConversations(filteredConversations);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Search…"
        className="pl-10 p-2 border rounded-full w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="p-2 bg-sky-500 text-white rounded-full">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
