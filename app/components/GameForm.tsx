import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface GameFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
}

export const GameForm = ({ isModalOpen, setIsModalOpen }: GameFormProps) => {
  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="fixed inset-0 bg-black/50 flex w-screen items-center justify-center p-4">
        <DialogPanel className={`w-75 h-48 border-white border text-white`}>
          <DialogTitle>Game Form</DialogTitle>
          <div>
            <div>
              <input placeholder="Player 1" type="text" />
              <input placeholder="final score" type="number" />
            </div>
            <div>
              <input placeholder="Player 2" />
              <input placeholder="final score" type="number" />
            </div>
            <div>
              <input placeholder="Player 3" />
              <input placeholder="final score" type="number" />
            </div>
            <div>
              <input placeholder="Player 4" />
              <input placeholder="final score" type="number" />
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
