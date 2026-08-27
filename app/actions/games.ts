import supabase from "../lib/subabase/supabase-client";
import { calculateScoreResults } from "../lib/scoring";
import type { GameMode, ScoreInput } from "../lib/types";

export const submitGame = async (mode: GameMode, inputs: ScoreInput[]) => {
	const results = calculateScoreResults(mode, inputs);
	const { data, error } = await supabase.rpc("submit_game", {
		game_mode: mode,
		game_players: results,
	});

	if (error) {
		throw error;
	}

	return data as string;
};
