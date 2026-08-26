import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import { Profile } from "@prisma/client";

export const UserListDropdown = () => {
  const { userList } = useAppContext();
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProfile =
    searchQuery === ""
      ? userList
      : userList.filter((user) => {
          return user.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
  return (
    <Combobox
      value={selectedProfile}
      onChange={setSelectedProfile}
      onClose={() => setSearchQuery("")}
    >
      <ComboboxInput
        aria-label="Player"
        displayValue={(user: Profile) => user?.name}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <ComboboxOptions anchor="bottom" className="">
        {filteredProfile.map((profile) => (
          <ComboboxOption key={profile.id} value={profile}>
            {profile.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};
