"use client";

import { Profile } from "../lib/types";
import { GameForm } from "./GameForm";
import { useState } from "react";

interface HomePageProps {
  userList: Profile[];
  isLoading: boolean;
  isError: boolean;
}

export const HomePage = ({ userList, isLoading, isError }: HomePageProps) => {
  const [isGameFormModalOpen, setIsGameFormModalOpen] = useState(false);
  return (
    <div className="profile-welcome content-wrap text-white" id="top">
      <div className="flex justify-between p-2 cursor-pointer">
        <h1>
          Welcome, <em></em>.
        </h1>
        <div onClick={() => setIsGameFormModalOpen(true)}>New Game Form</div>
      </div>
      <p className="lede">Choose a profile above to view its score overview.</p>
      {isLoading && <p>Loading users...</p>}
      {isError && <p>Unable to load users.</p>}
      {!isLoading &&
        !isError &&
        userList.map((user) => <div key={user.id}>{user.name}</div>)}
      {isGameFormModalOpen && (
        <GameForm
          isModalOpen={isGameFormModalOpen}
          setIsModalOpen={setIsGameFormModalOpen}
        />
      )}
    </div>
  );
};
