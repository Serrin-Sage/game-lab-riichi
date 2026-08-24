"use client";

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
        <div>Username</div>
        <div onClick={() => setIsModalOpen(true)}>+ New Player</div>
      </div>
    </div>
  );
};
