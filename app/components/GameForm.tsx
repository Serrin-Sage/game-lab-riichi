import { Combobox, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { UserListDropdown } from "./UserListDropdown";

interface GameFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
}

export const GameForm = ({ isModalOpen, setIsModalOpen }: GameFormProps) => {
  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="fixed inset-0 bg-black/50 flex w-screen items-center justify-center p-4">
        <DialogPanel
          className={`w-75 h-68 border-white border flex p-4 items-center flex-col bg-mahjong-red text-white rounded-[10px]`}
        >
          <DialogTitle>Game Form</DialogTitle>
          <div className="flex gap-4 flex-col">
            <div className="flex">
              <UserListDropdown />
              <input placeholder="final score" type="number" />
            </div>
            <div>
              <UserListDropdown />
              <input placeholder="final score" type="number" />
            </div>
            <div>
              <UserListDropdown />
              <input placeholder="final score" type="number" />
            </div>
            <div>
              <UserListDropdown />
              <input placeholder="final score" type="number" />
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
