// import { ResolutionMethod } from "../calculations/solvers/solvers";
// import {
//   Coordinate,
//   Density,
//   GravitationalConstant,
//   Mass,
// } from "../physics/physics";

// type PhysicBodyConfiguration = Readonly<{
//   mass: Mass;
//   density: Density;
//   initialPosition: Coordinate;
//   initialVelocity: Coordinate;
// }>;

// type PyhsicsConfiguration = Readonly<{
//   gravitationalConstant: GravitationalConstant;
//   bodies: PhysicBodyConfiguration[];
// }>;

// type GraphicalBodyConfiguration = Readonly<{
//   name: string;
//   color: string;
//   lineColor: string;
// }>;

// type GraphicalConfiguration = Readonly<{
//   width: number;
//   height: number;
//   calculationsPerFrame: number;
//   framesPerSecond: number;
//   drawTimesPerFrame: number;
//   metersPerPixel: number;
//   bodies: GraphicalBodyConfiguration[];
// }>;

// type CalculationConfiguration = Readonly<{
//   solver: ResolutionMethod;
// }>;

// export type SimulationConfiguration = Readonly<{
//   timeScaleFactor: number;
//   physics: PyhsicsConfiguration;
//   graphical: GraphicalConfiguration;
//   calculation: CalculationConfiguration;
// }>;
