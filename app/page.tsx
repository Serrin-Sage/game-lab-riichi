"use client";

import { useState } from "react";
import { Header } from "./components/layout/Header";
import { HomePage } from "./components/home/HomePage";
import { NewPlayerModal } from "./components/players/NewPlayerModal";

const Home = () => {
  const [isNewPlayerModalOpen, setIsNewPlayerModalOpen] = useState(false);

  return (
    <main className="app-shell bg-black h-dvh">
      <Header setIsModalOpen={() => setIsNewPlayerModalOpen(true)} />
      <HomePage />
      <NewPlayerModal
        isModalOpen={isNewPlayerModalOpen}
        setIsModalOpen={() => setIsNewPlayerModalOpen(false)}
      />
    </main>
  );
};

export default Home;
