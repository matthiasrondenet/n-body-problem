import { realWorldPresetNames, realWorldPresets } from "./real-world";
import { figure8PresetNames, figure8Presets } from "./figure-eight";
import { chaoticPresetNames, chaoticPresets } from "./chaotic";
import { periodicPresetNames, periodicPresets } from "./periodic";
import { SimulationConfig } from "../simulation/simulation-config-types";
import { kebabCase } from "lodash-es";

export const presets = {
  "Real world": realWorldPresets,
  "Figure 8": figure8Presets,
  Chaotic: chaoticPresets,
  Periodic: periodicPresets,
} as const;

export type PresetGroup = keyof typeof presets;

export const presetGroupNames = Object.keys(presets) as PresetGroup[];

export const allPresetNames = [
  ...realWorldPresetNames,
  ...figure8PresetNames,
  ...chaoticPresetNames,
  ...periodicPresetNames,
];
export type Preset = (typeof allPresetNames)[number];

export const allPresets: Record<Preset, SimulationConfig> = {
  ...realWorldPresets,
  ...figure8Presets,
  ...chaoticPresets,
  ...periodicPresets,
};

export const presetKeys = Object.fromEntries(
  allPresetNames.map((preset) => [preset, kebabCase(preset)])
) as Record<Preset, string>;
