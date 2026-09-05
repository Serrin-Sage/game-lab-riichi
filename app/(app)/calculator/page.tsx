"use client";

import { calculateBaseScore } from "@/app/lib/scoring";
import { FU_COUNT, HAN_COUNT } from "@/app/lib/types";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { CommonButton } from "@/app/components/home/CommonButton";

export default function CalculatorPage() {
  const [totalHan, setTotalHan] = useState(1);
  const [totalFu, setTotalFu] = useState(30);
  const [isDealer, setIsDealer] = useState(true);
  const [isTsumo, setIsTsumo] = useState(true);
  const [scoreMessage, setScoreMessage] = useState("");

  const getScore = () => {
    const payouts = calculateBaseScore(totalHan, totalFu, isDealer, isTsumo);
    if (!isTsumo) {
      setScoreMessage(`${payouts.ronPayout}`);
    } else if (isDealer) {
      setScoreMessage(`${payouts.tsumoDealerPayout} ALL`);
    } else {
      setScoreMessage(
        `${payouts.tsumoDealerPayout} - ${payouts.tsumoNonDealerPayout}`,
      );
    }
  };

  return (
    <main className="text-white flex-col w-full flex items-center justify-center gap-4 p-2">
      <h2 className="text-[28px] font-bold">Score Calculator</h2>
      <div className="flex items-center gap-4">
        <div className="text-center text-[18px] font-semibold">
          <h2>Dealer</h2>
          <div
            className={`${isDealer ? "bg-mahjong-red" : "bg-zinc-500 opacity-50"} p-2 rounded-2xl cursor-pointer relative`}
            onClick={() => setIsDealer((prevState) => !prevState)}
          >
            <Image
              src="/EastSymbol.svg"
              alt="East wind"
              width={48}
              height={64}
              className="h-16 w-12 object-contain"
            />
            {!isDealer && (
              <div className="absolute bg-black w-2.5 h-21.25 -top-0.5 right-7 rotate-35 rounded-lg opacity-80" />
            )}
          </div>
        </div>
        <div className="flex flex-col text-xl h-10 gap-2 ">
          <div
            className={`${isTsumo ? "bg-amber-500" : "bg-zinc-500"} rounded-lg text-center px-2 cursor-pointer`}
            onClick={() => setIsTsumo(true)}
          >
            Tsumo
          </div>
          <div
            className={`${!isTsumo ? "bg-amber-500" : "bg-zinc-500"} rounded-lg text-center px-2 cursor-pointer`}
            onClick={() => setIsTsumo(false)}
          >
            Ron
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="text-center text-[18px] font-semibold">
          <h1>Han</h1>
          <Listbox value={totalHan} onChange={setTotalHan}>
            <ListboxButton className="bg-mahjong-red cursor-pointer w-18.5 rounded-[10px] h-24 px-1 py-4 text-4xl flex items-center justify-center">
              {totalHan}
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              className="bg-mahjong-red w-18.5 rounded-[10px] text-center h-38.75 text-white font-semibold"
            >
              {HAN_COUNT.map((han, index) => (
                <ListboxOption
                  key={`${han}-${index}`}
                  value={han}
                  className="py-2 cursor-pointer"
                >
                  {han}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>
        <div className="text-center text-[18px] font-semibold">
          <h1>Fu</h1>
          <Listbox value={totalFu} onChange={setTotalFu}>
            <ListboxButton className="bg-mahjong-red cursor-pointer w-18.5 rounded-[10px] h-24 px-1 py-4 text-4xl flex items-center justify-center">
              {totalFu}
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              className="bg-mahjong-red w-18.5 rounded-[10px] text-center h-38.75 text-white font-semibold"
            >
              {FU_COUNT.map((fu, index) => (
                <ListboxOption
                  key={`${fu}-${index}`}
                  value={fu}
                  className="py-2 cursor-pointer"
                >
                  {fu}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>
      </div>
      <div className="text-[18px]">
        <span>Points to take: </span>
        <span className="font-semibold">{scoreMessage}</span>
      </div>
      <CommonButton
        buttonText="Get Score"
        buttonFunction={getScore}
        buttonStyle="px-2"
      />
    </main>
  );
}
