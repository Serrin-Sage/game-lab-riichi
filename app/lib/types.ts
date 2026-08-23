export const FOUR_PLAYER_SCORE_TOTAL = 120000;
export const THREE_PLAYER_SCORE_TOTAL = 105000;
export const FOUR_PLAYER_STARTING_POINTS = 30000;
export const THREE_PLAYER_STARTING_POINTS = 35000;

type User = {
  username: string;
  password: string;
  gameHistory: [{ gamesPlayed: number; gamesWon: number }];
};

type GameForm = {
  userName: string;
  finalScore: number;
};
