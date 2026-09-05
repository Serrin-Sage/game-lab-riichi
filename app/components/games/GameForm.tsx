"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { UserListDropdown } from "../players/UserListDropdown";
import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Profile, GameMode, ScoreInput } from "../../lib/types";
import { submitGame } from "../../lib/games";

interface GameFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
}

export const GameForm = ({ isModalOpen, setIsModalOpen }: GameFormProps) => {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState<GameMode>("4P");
  const [players, setPlayers] = useState<(Profile | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [scores, setScores] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const playerCount = mode === "4P" ? 4 : 3;
  const totalScore = scores
    .slice(0, playerCount)
    .reduce((total, score) => total + (Number(score) || 0), 0);

  const updateMode = (nextMode: GameMode) => {
    setMode(nextMode);
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const inputs: ScoreInput[] = players
      .slice(0, playerCount)
      .map((profile, index) => ({
        profileId: profile?.id ?? "",
        score: Number(scores[index]),
      }));

    try {
      setIsSubmitting(true);
      await submitGame(mode, inputs);
      await queryClient.invalidateQueries({ queryKey: ["games"] });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsSubmitting(false);
      setIsModalOpen(false);
      setPlayers([]);
      setScores([]);
    } catch (submissionError) {
      setIsSubmitting(false);
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit game.",
      );
    }
  };

  const handleScoreInput = (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
    index: number,
  ) => {
    setScores((currentScores) =>
      currentScores.map((score, scoreIndex) =>
        scoreIndex === index ? event.target.value : score,
      ),
    );
  };

  const isScoreTotaled = () => {
    if (playerCount === 4 && totalScore === 120000) return true;
    if (playerCount === 3 && totalScore === 105000) return true;
  };

  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="fixed inset-0 bg-black/50 flex w-screen items-center justify-center p-4">
        <DialogPanel
          className={`w-85 border-white border flex p-4 items-center flex-col bg-mahjong-red text-white rounded-[10px]`}
        >
          <DialogTitle className={`text-[26px]`}>Game Form</DialogTitle>
          <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
            <select
              value={mode}
              onChange={(event) => updateMode(event.target.value as GameMode)}
            >
              <option value="4P">4 player</option>
              <option value="3P">3 player</option>
            </select>
            {players.slice(0, playerCount).map((player, index) => {
              const selectedIds = players
                .filter((profile): profile is Profile => profile !== null)
                .map((profile) => profile.id);

              return (
                <div className="flex gap-2" key={index}>
                  <UserListDropdown
                    value={player}
                    onChange={(profile) =>
                      setPlayers((currentPlayers) =>
                        currentPlayers.map((currentPlayer, playerIndex) =>
                          playerIndex === index ? profile : currentPlayer,
                        ),
                      )
                    }
                    excludedProfileIds={selectedIds}
                    placeholderText={`Player ${index + 1}`}
                  />
                  <input
                    placeholder="final score"
                    type="number"
                    value={scores[index]}
                    onChange={(event) => handleScoreInput(event, index)}
                    className="border border-[#928989] rounded-sm w-37.5 pl-1.25"
                  />
                </div>
              );
            })}
            <div>
              <span>
                Total Score:{" "}
                <span className={`${isScoreTotaled() ? "text-green-400" : ""}`}>
                  {totalScore}
                </span>
              </span>
            </div>
            {error && <p role="alert">{error}</p>}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit game"}
            </button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
