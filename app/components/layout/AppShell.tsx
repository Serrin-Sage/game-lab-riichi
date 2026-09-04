"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GameForm } from "../games/GameForm";
import { NewPlayerModal } from "../players/NewPlayerModal";
import { Header } from "./Header";
import { ToastContainer } from "react-toastify";
import { CommonButton } from "../home/CommonButton";

const navItems = [
  { href: "/history", label: "History" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/calculator", label: "Calculator" },
];

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isNewPlayerModalOpen, setIsNewPlayerModalOpen] = useState(false);
  const [isGameFormModalOpen, setIsGameFormModalOpen] = useState(false);

  return (
    <main className="app-shell bg-black min-h-dvh text-white">
      <Header setIsModalOpen={() => setIsNewPlayerModalOpen(true)} />

      <div className="profile-welcome content-wrap p-2">
        <div className="flex gap-3 justify-between">
          <h1 className="text-[18px] font-bold">Welcome to GL Riichi</h1>
          <CommonButton
            buttonText="New Game Form"
            buttonStyle="p-2 hover:bg-zinc-800 text-[15px]"
            buttonFunction={() => setIsGameFormModalOpen(true)}
          />
        </div>
        <nav className="mt-4 flex flex-wrap gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md border px-3 py-2 text-sm transition ${
                  isActive
                    ? "border-mahjong-gold bg-mahjong-gold/20 text-white"
                    : "border-white/30 bg-transparent text-white/80 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="content-wrap px-2 pb-6">{children}</div>

      <NewPlayerModal
        isModalOpen={isNewPlayerModalOpen}
        setIsModalOpen={setIsNewPlayerModalOpen}
      />

      <GameForm
        isModalOpen={isGameFormModalOpen}
        setIsModalOpen={setIsGameFormModalOpen}
      />
      <ToastContainer />
    </main>
  );
};
