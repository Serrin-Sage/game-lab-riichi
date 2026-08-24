export const FOUR_PLAYER_SCORE_TOTAL = 120000;
export const THREE_PLAYER_SCORE_TOTAL = 105000;
export const FOUR_PLAYER_STARTING_POINTS = 30000;
export const THREE_PLAYER_STARTING_POINTS = 35000;

export type GameMode = "4P" | "3P";

export type Profile = {
  id: string;
  name: string;
  color: string;
  gameHistory: Game[];
  rank: number;
};

export type Player = Profile & {
  score: number;
  placement?: number;
  adjustment?: number;
};

export type Game = {
  id: string | number;
  date: string;
  mode: GameMode;
  players: Player[];
};

export type ScoreInput = {
  profileId: string;
  score: number;
};

export type ScoreResult = ScoreInput & {
  placement: number;
  adjustment: number;
};
