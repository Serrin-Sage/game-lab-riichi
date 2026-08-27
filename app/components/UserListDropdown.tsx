import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import type { Profile } from "../lib/types";

interface UserListDropdownProps {
  value: Profile | null;
  onChange: (profile: Profile | null) => void;
  excludedProfileIds?: string[];
  placeholderText?: string;
}

export const UserListDropdown = ({
  value,
  onChange,
  excludedProfileIds = [],
  placeholderText,
}: UserListDropdownProps) => {
  const { userList } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProfile =
    searchQuery === ""
      ? userList
      : userList.filter((user) => {
          return user.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
  const availableProfiles = filteredProfile.filter(
    (profile) =>
      !excludedProfileIds.includes(profile.id) || profile.id === value?.id,
  );
  return (
    <Combobox
      value={value}
      onChange={onChange}
      onClose={() => setSearchQuery("")}
    >
      <ComboboxInput
        aria-label="Player"
        displayValue={(user: Profile) => user?.name}
        onChange={(event) => setSearchQuery(event.target.value)}
        className={`border border-[#928989] rounded-sm w-37.5`}
        placeholder={placeholderText}
      />
      <ComboboxOptions anchor="bottom" className="bg-mahjong-red w-fit">
        {availableProfiles.map((profile) => (
          <ComboboxOption
            key={profile.id}
            value={profile}
            className="cursor-pointer"
          >
            {profile.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};
