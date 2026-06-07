# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An N-body problem simulator built with React, TypeScript, Tailwind CSS, and Shadcn. The application visualizes gravitational interactions between celestial bodies using numerical integration methods.

## Development Commands

### Build & Run
- `npm run dev` - Start development server with Vite
- `npm run build` - Type check with tsc and build for production
- `npm run preview` - Preview production build locally
- `npm run serve` - Serve the dist folder

### Testing & Quality
- `npm test` - Run tests with Vitest
- `npm run typecheck` - Run TypeScript compiler without emitting (useful for checking types)
- `npm run lint` - Lint TypeScript/TSX files with ESLint

## Core Architecture

### Physics Engine (`src/services/physics/`)

The simulation is based on solving ordinary differential equations (ODEs) that describe gravitational motion:

- **State representation**: Each body has a state vector `[x, y, vx, vy]` (position and velocity in 2D Cartesian coordinates)
- **Motion equations** (`motion.ts`): Builds the ODE system using Newton's law of gravitation. The `buildMotionOde()` function creates the differential equation that calculates accelerations based on current positions
- **Physics calculations** (`physics.ts`): Center of mass calculations, barycentric reference frame adjustments, distance calculations

### Numerical Solvers (`src/services/solvers/`)

Multiple numerical integration methods are available to solve the ODEs:

- **Euler integration**: Simple first-order method
- **Midpoint method**: Second-order method
- **Runge Kutta**: Fourth-order accurate method (default)
- **Gragg Bulirsch Stoer**: Adaptive high-order method

All solvers implement the `Solver` interface defined in `solver.ts`, taking an `OdeEquation`, initial conditions, range, and step size.

### Simulation State Management (`src/components/pages/playground/store/`)

Uses Zustand for state management:

- `simulations-store.ts`: Central store managing multiple simulations
- Each simulation contains:
  - `config`: SimulationConfig (bodies, solver, time parameters, graphical settings)
  - `state`: SimulationState (counter, time, status, fullscreen, dimensions)
- Supports preset simulations and user-created playground simulations
- Key actions: `addOrUpdatePreset`, `editInPlayground`, `patchConfig`, `patchState`

### Simulation Execution (`src/components/simulation/`)

The simulation loop is handled through custom hooks:

- `useSimulation()` in `simulation-hooks.ts`: Main hook that orchestrates the simulation
  - Pre-computes results for periodic orbits or calculates incrementally for non-periodic simulations
  - Uses `useSimulationLoop()` for animation frame management
  - Handles coordinate transformations and scaling for rendering
  - Manages state updates through callbacks

### Presets (`src/services/presets/`)

Four categories of preset simulations:
- **Real world**: Solar system bodies, Earth-Moon system, etc.
- **Figure 8**: Special periodic three-body configurations
- **Chaotic**: Chaotic three-body systems
- **Periodic**: Various periodic multi-body orbits

Presets are organized by type and accessed through `allPresets` in `presets.ts`.

### Rendering (`src/components/konva/`)

Uses React Konva for canvas-based rendering:
- Bodies rendered as circles with trails (orbits)
- Coordinate transformations handle physics coordinates → screen coordinates
- Supports scaling functions (linear, logarithmic) for distances and body sizes
- Optional features: axis display, center of mass, coordinates overlay

## Key Configuration Options

### SimulationConfig (`src/services/simulation/simulation-config-types.ts`)

Important fields:
- `bodies`: Array of `SimulationBodyConfig` (initial position/velocity, mass, diameter, color)
- `solverName`: Which numerical integration method to use
- `stepSize`: Integration time step (affects accuracy vs performance)
- `adjustBarycentric`: Whether to adjust to barycentric reference frame
- `timeSpeed`: Simulation speed multiplier
- `isPeriodic`: Pre-compute all results for periodic orbits
- `graphicalConfig`: Display options, scaling functions, orbit trail settings

### Path Alias

The project uses `@/` as an alias for `./src/` (configured in both `vite.config.ts` and `tsconfig.json`).

## Testing

Tests use Vitest and are co-located with source files using `.test.ts` suffix. Key test files:
- `src/services/physics/*.test.ts`: Physics calculations
- `src/services/solvers/solvers.test.ts`: Solver implementations
- `src/utils/*.test.ts`: Utility functions
