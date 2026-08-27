import supabase from "./subabase/supabase-client";
import { Profile } from "./types";

export const fetchUsers = async (): Promise<Profile[]> => {
  const { data, error } = await supabase.from("Users").select("*");

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const colorList = [
  "#DB3514",
  "#FF6D00",
  "#EEFF00",
  "#19A318",
  "#30CFAE",
  "#3078CF",
  "#4530CF",
  "#8530CF",
  "#CF30BF",
  "#BFBDBE",
  "#000000",
];
