"use client";

import { CommonButton } from "../home/CommonButton";

interface HeaderProps {
  setIsModalOpen: (val: boolean) => void;
}
export const Header = ({ setIsModalOpen }: HeaderProps) => {
  return (
    <div className="flex flex-row justify-between p-4 bg-mahjong-red text-white">
      <div>
        <h1>Game Lab Riichi</h1>
      </div>
      <div className="flex flex-row gap-4">
        <CommonButton
          buttonText="+ New Player"
          buttonStyle={`text-[14px] px-2`}
          buttonFunction={() => setIsModalOpen(true)}
        />
      </div>
    </div>
  );
};
