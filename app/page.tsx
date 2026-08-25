"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { NewPlayerModal } from "./components/NewPlayerModal";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./profile/utils";

const Home = () => {
  const [isNewPlayerModalOpen, setIsNewPlayerModalOpen] = useState(false);

  const {
    data: usersList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  return (
    <main className="app-shell bg-black h-dvh">
      <Header setIsModalOpen={() => setIsNewPlayerModalOpen(true)} />
      <HomePage userList={usersList} isLoading={isLoading} isError={isError} />
      <NewPlayerModal
        isModalOpen={isNewPlayerModalOpen}
        setIsModalOpen={() => setIsNewPlayerModalOpen(false)}
      />
    </main>
  );
};

export default Home;
