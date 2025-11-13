import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import {
  useSimulationActions,
  useSimulationConfig,
} from "../hooks/simulations-hooks";
import { SimulationConfig, defaultSimulationConfig } from "@/services/simulation/simulation-config-types";
import { JsonEditor } from "@/components/ui-custom/json-editor";
import { solverNames } from "@/services/solvers/solvers";
import { rangeScalingFunctionNames } from "@/utils/number";

type SettingsFormProps = {
  id: string;
};

export const SettingsForm: React.FC<SettingsFormProps> = ({ id }) => {
  const simulationConfig = useSimulationConfig(id);
  const { patchConfig } = useSimulationActions();

  const { register, handleSubmit, formState: { errors }, reset, watch, control } = useForm<SimulationConfig>({
    defaultValues: simulationConfig,
    values: simulationConfig,
  });

  const onSubmit = (data: SimulationConfig) => {
    patchConfig(id, () => data);
  };

  const resetToDefaults = () => {
    const defaultsWithCurrentBodies = {
      ...defaultSimulationConfig,
      name: simulationConfig.name || "Simulation",
      bodies: simulationConfig.bodies, // Keep existing bodies
    };
    reset(defaultsWithCurrentBodies);
    patchConfig(id, () => defaultsWithCurrentBodies);
  };

  // Auto-save on change (debounced in practice)
  React.useEffect(() => {
    const subscription = watch(() => {
      // Auto-save logic can be added here if needed
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Tabs defaultValue="physics" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="physics">Physics Settings</TabsTrigger>
            <TabsTrigger value="graphics">Graphics Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="physics" className="mt-4 space-y-4">
            <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
              {/* Name Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The name of your simulation</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="My Simulation"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Optional description of your simulation</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe your simulation..."
                  rows={3}
                />
              </div>

              {/* Gravitational Constant */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="gravitationalConstant">Gravitational Constant</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The gravitational constant G used in the simulation</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="gravitationalConstant"
                  type="number"
                  step="any"
                  {...register("gravitationalConstant", {
                    required: "Gravitational constant is required",
                    valueAsNumber: true,
                    validate: (value) => !isNaN(value) || "Must be a valid number"
                  })}
                  placeholder="6.67430e-11"
                />
                {errors.gravitationalConstant && (
                  <p className="text-sm text-red-500">{errors.gravitationalConstant.message}</p>
                )}
              </div>

              {/* Solver Name */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="solverName">Numerical Integration Method</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The numerical method used to solve the differential equations</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Controller
                  name="solverName"
                  control={control}
                  rules={{ required: "Solver is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a solver" />
                      </SelectTrigger>
                      <SelectContent>
                        {solverNames.map((solver) => (
                          <SelectItem key={solver} value={solver}>
                            {solver}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.solverName && (
                  <p className="text-sm text-red-500">{errors.solverName.message}</p>
                )}
              </div>

              {/* Adjust Barycentric */}
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="adjustBarycentric">Adjust to Barycentric Frame</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Adjust coordinates to the barycentric (center of mass) reference frame</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Controller
                  name="adjustBarycentric"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="adjustBarycentric"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              {/* Is Periodic */}
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="isPeriodic">Periodic Orbit</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Pre-compute all results for periodic orbits (improves performance)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Controller
                  name="isPeriodic"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="isPeriodic"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              {/* Time Unit */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="timeUnit">Time Unit</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The unit of time used in the simulation (e.g., seconds, days, years)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="timeUnit"
                  type="number"
                  step="any"
                  {...register("timeUnit", {
                    required: "Time unit is required",
                    valueAsNumber: true,
                    validate: (value) => (!isNaN(value) && value > 0) || "Must be a positive number"
                  })}
                />
                {errors.timeUnit && (
                  <p className="text-sm text-red-500">{errors.timeUnit.message}</p>
                )}
              </div>

              {/* Number of Steps */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="nbOfSteps">Number of Steps</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total number of calculation steps for periodic orbits</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="nbOfSteps"
                  type="number"
                  {...register("nbOfSteps", {
                    required: "Number of steps is required",
                    valueAsNumber: true,
                    validate: (value) => (Number.isInteger(value) && value > 0) || "Must be a positive integer"
                  })}
                />
                {errors.nbOfSteps && (
                  <p className="text-sm text-red-500">{errors.nbOfSteps.message}</p>
                )}
              </div>

              {/* Step Size */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="stepSize">Step Size (Optional)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Integration time step. Smaller values = more accurate but slower. Leave empty for auto calculation.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="stepSize"
                  type="number"
                  step="any"
                  {...register("stepSize", {
                    valueAsNumber: true,
                    validate: (value) => value === undefined || !isNaN(value) || "Must be a valid number"
                  })}
                  placeholder="Auto (leave empty)"
                />
                {errors.stepSize && (
                  <p className="text-sm text-red-500">{errors.stepSize.message}</p>
                )}
              </div>

              {/* Time Speed */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="timeSpeed">Time Speed Multiplier</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Speed multiplier for the simulation playback (1 = normal speed)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="timeSpeed"
                  type="number"
                  step="any"
                  {...register("timeSpeed", {
                    required: "Time speed is required",
                    valueAsNumber: true,
                    validate: (value) => (!isNaN(value) && value > 0) || "Must be a positive number"
                  })}
                />
                {errors.timeSpeed && (
                  <p className="text-sm text-red-500">{errors.timeSpeed.message}</p>
                )}
              </div>

              {/* Frames Per Second */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="framesPerSecond">Frames Per Second</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Target frame rate for animation (higher = smoother but more CPU intensive)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="framesPerSecond"
                  type="number"
                  {...register("framesPerSecond", {
                    required: "FPS is required",
                    valueAsNumber: true,
                    validate: (value) => (Number.isInteger(value) && value > 0 && value <= 120) || "Must be an integer between 1 and 120"
                  })}
                />
                {errors.framesPerSecond && (
                  <p className="text-sm text-red-500">{errors.framesPerSecond.message}</p>
                )}
              </div>

              {/* Bodies - Keep as JSON for now */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Bodies Configuration</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="size-4 cursor-help text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Array of celestial bodies with their initial conditions</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <JsonEditor
                  value={simulationConfig.bodies as unknown as Record<string, unknown>}
                  onValueChange={(newBodies) => {
                    patchConfig(id, (config) => ({
                      ...config,
                      bodies: (newBodies as unknown) as SimulationConfig["bodies"],
                    }));
                  }}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="graphics" className="mt-4 space-y-4">
            <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
              {/* Display Toggles Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Display Options</h3>

                {/* Display Bodies */}
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="displayBodies">Display Bodies</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Show or hide the celestial bodies</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Controller
                    name="graphicalConfig.displayBodies"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="displayBodies"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>

                {/* Display Orbits */}
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="displayOrbits">Display Orbits</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Show or hide the orbital trails</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Controller
                    name="graphicalConfig.displayOrbits"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="displayOrbits"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>

                {/* Display Axis */}
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="displayAxis">Display Axis</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Show or hide coordinate axes</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Controller
                    name="graphicalConfig.displayAxis"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="displayAxis"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>

                {/* Display Center of Mass */}
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="displayCom">Display Center of Mass</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Show or hide the center of mass marker</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Controller
                    name="graphicalConfig.displayCom"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="displayCom"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>

                {/* Display Coordinates */}
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="displayCoordinates">Display Coordinates Overlay</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Show or hide coordinate information overlay</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Controller
                    name="graphicalConfig.displayCoordinates"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="displayCoordinates"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>

                {/* Display Bodies Coordinates */}
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="displayBodiesCoordinates">Display Bodies Coordinates</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Show coordinates next to each body</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Controller
                    name="graphicalConfig.displayBodiesCoordinates"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="displayBodiesCoordinates"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>

                {/* Display Bodies Names */}
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="displayBodiesBodiesNames">Display Bodies Names</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Show names next to each body</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Controller
                    name="graphicalConfig.displayBodiesBodiesNames"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="displayBodiesBodiesNames"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>

                {/* Display Bodies Axis */}
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="displayBodiesBodiesAxis">Display Bodies Axis</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Show axis indicators for each body</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Controller
                    name="graphicalConfig.displayBodiesBodiesAxis"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="displayBodiesBodiesAxis"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Scaling Functions Section */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-medium">Scaling Functions</h3>

                {/* Diameters Scaling Function */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="diametersScalingFunc">Body Size Scaling</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Function used to scale body diameters for visualization</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Controller
                    name="graphicalConfig.diametersScalingFunc"
                    control={control}
                    rules={{ required: "Diameter scaling function is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select scaling function" />
                        </SelectTrigger>
                        <SelectContent>
                          {rangeScalingFunctionNames.map((func) => (
                            <SelectItem key={func} value={func}>
                              {func}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Distances Scaling Function */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="distancesScalingFunc">Distance Scaling (Optional)</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Function used to scale distances for visualization. Leave empty for no scaling.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Controller
                    name="graphicalConfig.distancesScalingFunc"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => field.onChange(value === "none" ? undefined : value)}
                        value={field.value || "none"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="No scaling" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No scaling</SelectItem>
                          {rangeScalingFunctionNames.map((func) => (
                            <SelectItem key={func} value={func}>
                              {func}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Distance Scaling Factor */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="distancesScalingFactor">Distance Scaling Factor</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Multiplier for distance scaling (1 = no change)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="distancesScalingFactor"
                    type="number"
                    step="any"
                    {...register("graphicalConfig.distancesScalingFactor", {
                      required: "Distance scaling factor is required",
                      valueAsNumber: true,
                      validate: (value) => (!isNaN(value) && value > 0) || "Must be a positive number"
                    })}
                  />
                </div>
              </div>

              {/* Size Settings Section */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-medium">Body Size Constraints</h3>

                {/* Minimum Size Pixels */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="minimumSizePixels">Minimum Size (pixels)</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Minimum size in pixels for displaying bodies</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="minimumSizePixels"
                    type="number"
                    {...register("graphicalConfig.minimumSizePixels", {
                      required: "Minimum size is required",
                      valueAsNumber: true,
                      validate: (value) => (Number.isInteger(value) && value > 0) || "Must be a positive integer"
                    })}
                  />
                </div>

                {/* Maximum Size Pixels */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="maximumSizePixels">Maximum Size (pixels)</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Maximum size in pixels for displaying bodies</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="maximumSizePixels"
                    type="number"
                    {...register("graphicalConfig.maximumSizePixels", {
                      required: "Maximum size is required",
                      valueAsNumber: true,
                      validate: (value) => (Number.isInteger(value) && value > 0) || "Must be a positive integer"
                    })}
                  />
                </div>
              </div>

              {/* Orbit Trail Settings Section */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-medium">Orbit Trail Settings</h3>

                {/* Number of History Points */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="nbOfHistoryPoints">Number of History Points</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Maximum number of points to display in orbit trails</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="nbOfHistoryPoints"
                    type="number"
                    {...register("graphicalConfig.nbOfHistoryPoints", {
                      required: "Number of history points is required",
                      valueAsNumber: true,
                      validate: (value) => (Number.isInteger(value) && value > 0) || "Must be a positive integer"
                    })}
                  />
                </div>

                {/* History Points Ratio */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="historyPointsRatio">History Points Ratio</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 cursor-help text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ratio of points to show in trail (1 = all points, 0.5 = every other point)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="historyPointsRatio"
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    {...register("graphicalConfig.historyPointsRatio", {
                      required: "History points ratio is required",
                      valueAsNumber: true,
                      validate: (value) => (!isNaN(value) && value > 0 && value <= 1) || "Must be between 0 and 1"
                    })}
                  />
                </div>
              </div>

              {/* Additional Content Display Section */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="text-sm font-medium">Additional Information Display</h3>
                <p className="text-xs text-slate-500">Select which information to display on screen</p>

                <Controller
                  name="graphicalConfig.additionnalContents"
                  control={control}
                  render={({ field }) => {
                    const additionalContentOptions = [
                      { value: "name" as const, label: "Simulation Name" },
                      { value: "step-size" as const, label: "Step Size" },
                      { value: "nb-of-calculations" as const, label: "Number of Calculations" },
                      { value: "timeUnit" as const, label: "Time Unit" },
                      { value: "t" as const, label: "Current Time (t)" },
                      { value: "timeSpeed" as const, label: "Time Speed" },
                    ];

                    const toggleContent = (contentType: typeof additionalContentOptions[number]["value"]) => {
                      const currentContents = field.value || [];
                      const isSelected = currentContents.includes(contentType);

                      if (isSelected) {
                        field.onChange(currentContents.filter((c) => c !== contentType));
                      } else {
                        field.onChange([...currentContents, contentType]);
                      }
                    };

                    return (
                      <div className="space-y-2">
                        {additionalContentOptions.map((option) => (
                          <div key={option.value} className="flex items-center justify-between space-x-2">
                            <Label htmlFor={`additional-${option.value}`}>{option.label}</Label>
                            <Switch
                              id={`additional-${option.value}`}
                              checked={field.value?.includes(option.value) || false}
                              onCheckedChange={() => toggleContent(option.value)}
                            />
                          </div>
                        ))}
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between gap-2 border-t pt-4">
          <Button
            type="button"
            variant="destructive"
            onClick={resetToDefaults}
          >
            Reset to Defaults
          </Button>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
            >
              Cancel Changes
            </Button>
            <Button type="submit">Apply Changes</Button>
          </div>
        </div>
      </form>
    </TooltipProvider>
  );
};
