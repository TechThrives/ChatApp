import { useState } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import useGetUsers from "../hooks/useGetUsers";

const SearchInput = ({ setFilteredUsers }) => {
  const [search, setSearch] = useState("");
  const { users } = useGetUsers();

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredUsers = users.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredUsers.length === 0) {
      toast.error("No users found!");
    } else {
      toast.success(`${filteredUsers.length} user(s) found`);
    }

    setFilteredUsers(filteredUsers);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 m-4">
      <input
        type="text"
        placeholder="Search…"
        className="pl-4 p-2 border-2 border-gray-300  rounded-full w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="p-2 bg-sky-500 text-white rounded-full">
        <Icon icon="mdi:magnify" className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
