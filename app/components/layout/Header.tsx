"use client";

import { useAppContext } from "@/app/context/AppContext";
import { CommonButton } from "../home/CommonButton";
import { UserListDropdown } from "../players/UserListDropdown";
import { Profile } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface HeaderProps {
  setIsModalOpen: (val: boolean) => void;
}
export const Header = ({ setIsModalOpen }: HeaderProps) => {
  const { selectedOverviewProfile, setSelectedOverviewProfile } =
    useAppContext();
  const router = useRouter();

  const handleProfileChange = useCallback(
    (profile: Profile | null) => {
      if (profile) {
        setSelectedOverviewProfile(profile);
        router.push(`/players/${profile.id}`);
      }
    },
    [router, setSelectedOverviewProfile],
  );

  const handleExit = () => {
    setSelectedOverviewProfile(null);
    router.push(`/history`);
  };
  return (
    <div className="flex flex-row items-center justify-between p-4 bg-mahjong-red text-white">
      <div>
        <h1>Game Lab Riichi</h1>
      </div>
      <div className="flex flex-row gap-2">
        <UserListDropdown
          value={selectedOverviewProfile}
          onChange={handleProfileChange}
          onExit={handleExit}
          placeholderText="view player"
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
