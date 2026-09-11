import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import type { Profile } from "../../lib/types";
import Image from "next/image";

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
  const { userList, setSelectedOverviewProfile } = useAppContext();
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
  const handleExit = () => {
    setSelectedOverviewProfile(null);
  };
  return (
    <div className="flex">
      <Combobox
        value={value}
        onChange={onChange}
        onClose={() => setSearchQuery("")}
      >
        <ComboboxInput
          aria-label="Player"
          displayValue={(user: Profile) => user?.name}
          onChange={(event) => setSearchQuery(event.target.value)}
          className={`border-y border-l border-[#928989] rounded-sm w-27.5 pl-1.25 py-1.25`}
          placeholder={placeholderText}
        />
        <ComboboxOptions
          anchor="bottom"
          className="bg-[#630710] w-37.5 border-[#928989] border rounded-sm text-white max-h-12.5 overflow-auto"
        >
          {availableProfiles.map((profile) => (
            <ComboboxOption
              key={profile.id}
              value={profile}
              className="cursor-pointer pl-1.25 hover:bg-[#7c0a15] py-1.25"
            >
              {profile.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
        <div
          onClick={handleExit}
          className="border-y border-r rounded-r-sm border-[#928989]"
        >
          <Image
            src="/CloseIcon.svg"
            alt="East wind"
            width={18}
            height={18}
            className="h-[18px] w-[18px] object-contain"
          />
        </div>
      </Combobox>
    </div>
  );
};
