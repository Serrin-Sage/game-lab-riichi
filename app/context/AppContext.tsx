"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../profile/utils";
import type { Game, Profile, ScoreResult } from "../lib/types";

type AppContextValue = {
  userList: Profile[];
  isLoading: boolean;
  isError: boolean;
  games: Game[];
  scoreResults: ScoreResult[];
  setScoreResults: Dispatch<SetStateAction<ScoreResult[]>>;
  addGame: (game: Game) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [scoreResults, setScoreResults] = useState<ScoreResult[]>([]);
  const {
    data: userList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const addGame = (game: Game) => {
    setGames((currentGames) => [...currentGames, game]);
  };

  return (
    <AppContext.Provider
      value={{
        userList,
        isLoading,
        isError,
        games,
        scoreResults,
        setScoreResults,
        addGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }

  return context;
};
