import supabase from "../lib/subabase/supabase-client";
import { Profile } from "../lib/types";
import { useQuery } from "@tanstack/react-query";

export const HomePage = () => {
  const fetchUsers = async (): Promise<Profile[]> => {
    const { data, error } = await supabase.from("Users").select("*");

    if (error) {
      throw error;
    }

    return data ?? [];
  };
  const {
    data: usersList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <div className="profile-welcome content-wrap text-white" id="top">
      <h1>
        Welcome, <em></em>.
      </h1>
      <p className="lede">Choose a profile above to view its score overview.</p>
      {isLoading && <p>Loading users...</p>}
      {isError && <p>Unable to load users.</p>}
      {!isLoading &&
        !isError &&
        usersList.map((user) => <div key={user.id}>{user.name}</div>)}
    </div>
  );
};
