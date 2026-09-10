"use client";

import { useAppContext } from "@/app/context/AppContext";
import { CommonButton } from "../home/CommonButton";
import { UserListDropdown } from "../players/UserListDropdown";
import { Profile } from "@/app/lib/types";

interface HeaderProps {
  setIsModalOpen: (val: boolean) => void;
}
export const Header = ({ setIsModalOpen }: HeaderProps) => {
  const { selectedOverviewProfile, setSelectedOverviewProfile } =
    useAppContext();

  const handleProfileChange = (profile: Profile | null) => {
    if (profile) setSelectedOverviewProfile(profile);
  };
  return (
    <div className="flex flex-row justify-between p-4 bg-mahjong-red text-white">
      <div>
        <h1>Game Lab Riichi</h1>
      </div>
      <div className="flex flex-row gap-4">
        <UserListDropdown
          value={selectedOverviewProfile}
          onChange={handleProfileChange}
        />
        <CommonButton
          buttonText="+ New Player"
          buttonStyle={`text-[14px] px-2`}
          buttonFunction={() => setIsModalOpen(true)}
        />
      </div>
    </div>
  );
};
