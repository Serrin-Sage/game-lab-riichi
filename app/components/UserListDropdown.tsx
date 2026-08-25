import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../profile/utils";

export const UserListDropdown = () => {
  const {
    data: usersList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  return <div>UserListDropdown</div>;
};
