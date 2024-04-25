import { Preset, SimulationConfig } from "./presets/presets";
import { figureEightConfig } from "./presets/figure-eight";
import { sunEarthJupiter } from "./presets/sun-earth-jupiter";
import { lagrangePoint5 } from "./presets/lagrange-point-5";
import { kepler16 } from "./presets/kepler-16";
import { chaotic } from "./presets/chaotic";

export const presets: Record<Preset, SimulationConfig> = {
  "Figure Eight": figureEightConfig,
  "Sun Earth Jupiter": sunEarthJupiter,
  "Lagrange Point 5": lagrangePoint5,
  "Kepler 16": kepler16,
  "Chaotic 1": chaotic,
};
