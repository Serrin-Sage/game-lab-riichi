"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { NewPlayerModal } from "./components/NewPlayerModal";

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
