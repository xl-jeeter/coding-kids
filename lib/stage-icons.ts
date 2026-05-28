import { Brain, Code2, Gamepad2, Palette, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { StageIconName } from "@/lib/courses";

const stageIcons: Record<StageIconName, LucideIcon> = {
  brain: Brain,
  palette: Palette,
  gamepad: Gamepad2,
  code: Code2,
  rocket: Rocket,
};

export function getStageIcon(icon: StageIconName) {
  return stageIcons[icon];
}
