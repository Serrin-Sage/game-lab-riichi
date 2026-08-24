import {
  FOUR_PLAYER_SCORE_TOTAL,
  THREE_PLAYER_SCORE_TOTAL,
  GameMode,
  ScoreInput,
  ScoreResult,
} from "./types";

const profiles = {
  "4P": {
    total: FOUR_PLAYER_SCORE_TOTAL,
    returnPoints: 30000,
    uma: [15, 5, -5, -15],
    oka: 0,
  },
  "3P": {
    total: THREE_PLAYER_SCORE_TOTAL,
    returnPoints: 40000,
    uma: [15, 0, -15],
    oka: 15,
  },
} as const;

export const calculateScoreResults = (
  mode: GameMode,
  inputs: ScoreInput[],
): ScoreResult[] => {
  const rule = profiles[mode];
  if (inputs.length !== rule.uma.length)
    throw new Error(`${mode} requires ${rule.uma.length} players.`);
  if (new Set(inputs.map((input) => input.profileId)).size !== inputs.length)
    throw new Error("Each player must be unique.");
  if (
    inputs.some(
      (input) =>
        !input.profileId || !Number.isInteger(input.score) || input.score < 0,
    )
  )
    throw new Error("Scores must be non-negative whole numbers.");
  if (inputs.reduce((total, input) => total + input.score, 0) !== rule.total)
    throw new Error(`Scores must total ${rule.total.toLocaleString()}.`);

  const ranked = [...inputs].sort((left, right) => right.score - left.score);
  return ranked.map((input, index) => ({
    ...input,
    placement: index + 1,
    adjustment:
      (input.score - rule.returnPoints) / 1000 +
      rule.uma[index] +
      (index === 0 ? rule.oka : 0),
  }));
};
