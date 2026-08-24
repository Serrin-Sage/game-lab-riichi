"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { Profile } from "./lib/types";

const initialProfiles: Profile[] = [
  { id: "you", name: "You", color: "coral" },
  { id: "mina", name: "Mina", color: "blue" },
  { id: "jules", name: "Jules", color: "gold" },
  { id: "rook", name: "Rook", color: "teal" },
];

export default function Home() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [selectedProfileId, setSelectedProfileId] = useState(
    initialProfiles[0].id,
  );
  const selectedProfile =
    profiles.find((profile) => profile.id === selectedProfileId) ?? profiles[0];

  return (
    <main className="app-shell">
      <Header />
      <HomePage profile={selectedProfile} />
    </main>
  );
}
