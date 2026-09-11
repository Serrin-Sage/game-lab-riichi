import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import type { Profile } from "../../lib/types";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
    router.push(`/history`);
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
          className={`${value ? "w-27.5 border-y border-l rounded-l-sm" : "w-33.5 border rounded-sm"}  border-[#928989]   pl-1.25 py-1.25`}
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
        {value && (
          <div
            onClick={handleExit}
            className={`border rounded-r-sm border-[#928989] flex items-center justify-center cursor-pointer`}
          >
            <Image
              src="/CloseIcon.svg"
              alt="East wind"
              width={22}
              height={22}
              className={`h-5.5 w-5.5 object-contain`}
            />
          </div>
        )}
      </Combobox>
    </div>
  );
};
