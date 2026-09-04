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

export const calculateBaseScore = (
  han: number,
  fu: number,
  isDealer: boolean,
  isTsumo: boolean,
) => {
  let baseScore: number;
  let dealerPayout = 0;
  let nonDealerPayout = 0;
  let allPayout = 0;
  if (han >= 13) {
    baseScore = 8000;
  } else if (han >= 11) {
    baseScore = 6000;
  } else if (han >= 8) {
    baseScore = 4000;
  } else if (han >= 6) {
    baseScore = 3000;
  } else if (han >= 5) {
    baseScore = 2000;
  } else {
    baseScore = Math.ceil((fu * 2 ** (2 + han)) / 100) * 100;
  }

  if (!isDealer && isTsumo) {
    dealerPayout = baseScore * 2;
    nonDealerPayout = baseScore;
  } else if (!isDealer && !isTsumo) {
    allPayout = baseScore * 4;
  } else if (isDealer && isTsumo) {
    allPayout = baseScore * 2;
  } else if (isDealer && !isTsumo) {
    nonDealerPayout = baseScore * 6;
  }

  console.log(han, fu, dealerPayout, nonDealerPayout, allPayout);

  return {
    dealerPayout: dealerPayout,
    nonDealerPayout: nonDealerPayout,
    allPayout: allPayout,
  };
};
