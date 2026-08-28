interface PlacementBadgeProps {
  placement?: number;
}

const placementStyles: Record<number, { colors: string; identifier: string }> =
  {
    1: { colors: "bg-amber-400/15 text-amber-400", identifier: "st" },
    2: { colors: "bg-zinc-100/15 text-zinc-300", identifier: "nd" },
    3: { colors: "bg-orange-700/15 text-orange-400", identifier: "rd" },
    4: { colors: "bg-gray-800/50 text-gray-300", identifier: "th" },
  };

export const PlacementBadge = ({ placement }: PlacementBadgeProps) => {
  if (placement == null) return null;

  const display = placementStyles[placement] ?? {
    colors: "bg-gray-800/50 text-gray-300",
    identifier: "th",
  };

  return (
    <div
      className={`${display.colors} w-8 h-5 rounded-full inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-semibold shrink-0`}
    >
      {placement}
      {display.identifier}
    </div>
  );
};
