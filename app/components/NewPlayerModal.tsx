import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import supabase from "../lib/subabase/supabase-client";
import { colorList } from "../profile/utils";

interface NewPlayerModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
}

export const NewPlayerModal = ({
  isModalOpen,
  setIsModalOpen,
}: NewPlayerModalProps) => {
  const [newUsername, setNewUserName] = useState("");
  const [colorSelection, setColorSelection] = useState("#DB3514");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setNewUserName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    const newUserData = {
      name: newUsername,
      color: colorSelection,
      gameHistory: [],
      rank: 0,
    };

    const { data, error } = await supabase
      .from("Users")
      .insert([newUserData])
      .single();

    if (error) {
      setError(error.toJSON.toString());
      console.log("Error adding user:", error);
    } else {
      setIsModalOpen(false);
      setIsSubmitting(false);
      console.log(data);
    }
  };
  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="fixed inset-0 bg-black/50 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-75 h-48 border-white border flex p-4 items-center flex-col bg-mahjong-red text-white rounded-[10px] justify-between">
          <DialogTitle className={`text-[26px]`}>Create a new user</DialogTitle>
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              placeholder="type new username"
              required
              className="border-black border rounded-sm h-9 pl-1.25 text-4"
              value={newUsername}
              onChange={(e) => handleOnChange(e)}
            />
            <div className="flex gap-1.5 flex-wrap justify-center w-50">
              {colorList.map((color, index) => {
                return (
                  <div
                    key={index}
                    className={`cursor-pointer border-2 size-7 rounded-full ${colorSelection === color ? "border-white" : "border-gray-400"}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setColorSelection(color)}
                  />
                );
              })}
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Done"}
            </button>
            {error && <p role="alert">{error}</p>}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
