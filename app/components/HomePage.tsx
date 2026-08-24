import supabase from "../lib/subabase/supabase-client";
import { Profile } from "../lib/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface HomePage {
  usersList: Profile[];
  setUsersList: (val: Profile[]) => void;
}
export const HomePage = ({ usersList, setUsersList }: HomePage) => {
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("Users").select("*");

    if (error) {
      console.log("Error fetching users:", error);
    } else {
      setUsersList(data);
    }
  };
  const query = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
  console.log(query);

  return (
    <div className="profile-welcome content-wrap text-white" id="top">
      <h1>
        Welcome, <em></em>.
      </h1>
      <p className="lede">Choose a profile above to view its score overview.</p>
      {usersList.map((user) => {
        return <div key={user.id}>{user.name}</div>;
      })}
    </div>
  );
};
