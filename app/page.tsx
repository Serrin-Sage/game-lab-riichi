"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { Profile } from "./lib/types";
import { NewPlayerModal } from "./components/NewPlayerModal";

const queryClient = new QueryClient();

const Home = () => {
  const [isNewPlayerModalOpen, setIsNewPlayerModalOpen] = useState(false);
  const [usersList, setUsersList] = useState<Profile[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="app-shell bg-black h-dvh">
        <Header setIsModalOpen={() => setIsNewPlayerModalOpen(true)} />
        <HomePage usersList={usersList} setUsersList={setUsersList} />
        <NewPlayerModal
          isModalOpen={isNewPlayerModalOpen}
          setIsModalOpen={() => setIsNewPlayerModalOpen(false)}
        />
      </main>
    </QueryClientProvider>
  );
};

export default Home;
