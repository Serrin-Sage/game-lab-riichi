import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ChangeEvent, SubmitEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import supabase from "../../lib/subabase/supabase-client";
import { colorList } from "../../lib/profiles";
import { toast } from "react-toastify";

interface NewPlayerModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
}

export const NewPlayerModal = ({
  isModalOpen,
  setIsModalOpen,
}: NewPlayerModalProps) => {
  const queryClient = useQueryClient();
  const [newUsername, setNewUserName] = useState("");
  const [colorSelection, setColorSelection] = useState("#DB3514");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const notifySuccess = () => toast.success(`New Player Added: ${newUsername}`);
  const notifyError = (errorMessage: string) =>
    toast.error(`Failed to add user: ${errorMessage}`);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setNewUserName(e.target.value);
  };

  const isFormDisabled = isSubmitting || newUsername === "";

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    const newUserData = {
      name: newUsername,
      color: colorSelection,
      games_played: 0,
      average_score: 0,
      gameHistory: [],
      rank: 0,
    };

    const { data, error } = await supabase
      .from("Users")
      .insert([newUserData])
      .single();

    if (error) {
      setError(error.message);
      setIsModalOpen(false);
      setIsSubmitting(false);
      setNewUserName("");
      notifyError(error.message);
      console.log("Error adding user:", error);
    } else {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsModalOpen(false);
      setIsSubmitting(false);
      setNewUserName("");
      setError("");
      notifySuccess();
      console.log(data);
    }
  };
  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="fixed inset-0 bg-black/50 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-70 h-60 border-white border flex p-4 items-center flex-col bg-mahjong-red text-white rounded-[10px] justify-between">
          <DialogTitle className={`text-[26px]`}>Add player</DialogTitle>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <div className="w-full">
              <button
                type="submit"
                disabled={isFormDisabled}
                className={`${isFormDisabled ? "opacity-50 cursor-default" : "cursor-pointer"} float-right border border-white rounded-sm px-2`}
              >
                {isSubmitting ? "Creating..." : "Done"}
              </button>
            </div>
            {error && <p role="alert">{error}</p>}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
