"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";

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
        <Menu>
          <MenuButton>USERNAME</MenuButton>
          <MenuItems anchor="bottom"></MenuItems>
        </Menu>
        <div
          onClick={() => setIsModalOpen(true)}
          className="border border-white rounded-lg p-1"
        >
          + New Player
        </div>
      </div>
    </div>
  );
};
