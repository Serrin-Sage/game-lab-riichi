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
import { fetchUsers } from "../lib/profiles";
import type { Game, Profile, ScoreResult, StoredGame } from "../lib/types";
import { fetchGames } from "../lib/games";

type AppContextValue = {
  userList: Profile[];
  gamesList: Game[];
  isLoading: boolean;
  isError: boolean;
  games: Game[];
  scoreResults: ScoreResult[];
  setScoreResults: Dispatch<SetStateAction<ScoreResult[]>>;
  addGame: (game: Game) => void;
  selectedOverviewProfile: Profile | null;
  setSelectedOverviewProfile: (profile: Profile) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [scoreResults, setScoreResults] = useState<ScoreResult[]>([]);
  const [selectedOverviewProfile, setSelectedOverviewProfile] =
    useState<Profile | null>(null);
  const {
    data: userList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const {
    data: storedGames = [],
    isLoading: isGamesLoading,
    isError: isGamesError,
  } = useQuery<StoredGame[]>({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  const gamesList: Game[] = storedGames.map((game) => ({
    id: game.id,
    date: game.created_at,
    mode: game.mode,
    players: (game.GamePlayers ?? []).map((result) => {
      const profile = userList.find((user) => user.id === result.profile_id);

      return {
        ...(profile ?? {
          id: result.profile_id,
          name: "Unknown player",
          color: "#928989",
          gameHistory: [],
          rank: 0,
        }),
        score: result.score,
        placement: result.placement,
        adjustment: result.adjustment,
      };
    }),
  }));

  const addGame = (game: Game) => {
    setGames((currentGames) => [...currentGames, game]);
  };

  return (
    <AppContext.Provider
      value={{
        userList,
        gamesList,
        isLoading: isLoading || isGamesLoading,
        isError: isError || isGamesError,
        games,
        scoreResults,
        setScoreResults,
        addGame,
        selectedOverviewProfile,
        setSelectedOverviewProfile,
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
