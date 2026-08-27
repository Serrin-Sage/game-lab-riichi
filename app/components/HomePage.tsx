"use client";

import { GameForm } from "./GameForm";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export const HomePage = () => {
  const { userList, isLoading, isError } = useAppContext();
  const [isGameFormModalOpen, setIsGameFormModalOpen] = useState(false);
  return (
    <div className="profile-welcome content-wrap text-white" id="top">
      <div className="flex justify-between p-2 ">
        <h1>Welcome to GL Riichi</h1>
        <div
          onClick={() => setIsGameFormModalOpen(true)}
          className="cursor-pointer"
        >
          New Game Form
        </div>
      </div>
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
