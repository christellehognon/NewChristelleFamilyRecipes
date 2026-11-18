import type { ChiefName } from "@/data/recipes";
import { chefColorStyle } from "@/lib/chef-color";
import { ChefPhoto } from "./ChefPhoto";
import { FilterPill } from "./FilterPill";

export function ChefPill({
  name,
  img,
  active,
  onClick,
}: {
  name: string;
  img?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <FilterPill
      active={active}
      onClick={onClick}
      className="inline-flex items-center gap-2 px-3"
    >
      <span
        className="inline-flex rounded-full ring-2 ring-(color:--chef)"
        style={chefColorStyle(name as ChiefName)}
      >
        <ChefPhoto
          src={img}
          lazy
          className="size-6 rounded-full object-cover"
          iconClassName="size-3.5"
        />
      </span>
      <span>{name}</span>
    </FilterPill>
  );
}
