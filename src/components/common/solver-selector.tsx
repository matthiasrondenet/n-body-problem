import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SolverName, solverNames } from "@/services/solvers/solvers";
import { Label } from "../ui/label";

interface SolverSelectorProps {
  value: SolverName | undefined;
  label?: string;
  className?: string;
  classNameTrigger?: string;
  options?: SolverName[];
  onValueChange: (value: SolverName) => void;
}
export const SolverSelector: React.FC<SolverSelectorProps> = ({
  value,
  label,
  className,
  classNameTrigger,
  options,
  onValueChange,
}) => {
  const solverNamesOptions = options ?? solverNames;

  return (
    <span className={cn("flex flex-row items-center gap-3", className)}>
      {label && <Label>{label}</Label>}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={cn("w-52", classNameTrigger)}>
          <SelectValue placeholder="Select a solver" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {solverNamesOptions.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </span>
  );
};
