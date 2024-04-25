import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { TooltipText } from "@/components/ui-custom/tooltip-text";
import { useSimulationIsFullScreen } from "../hooks/fullscreen-state-hooks";
import { useSimulationName } from "../hooks/name-hooks";

type TitleProps = {
  id: string;
  index?: number;
};

const SimulationBadge: React.FC<{ index: number }> = ({ index }) => (
  <Badge>#{index + 1}</Badge>
);

export const Title: React.FC<TitleProps> = ({ id, index }) => {
  const simulationName = useSimulationName(id);
  const isFullScreen = useSimulationIsFullScreen(id);

  return (
    <>
      {isFullScreen ? (
        <>
          <CardTitle
            className="flex flex-row items-center gap-2 truncate md:whitespace-normal"
            title={simulationName}
          >
            {index !== undefined && (
              <div className="flex flex-row gap-2">
                <SimulationBadge index={index} /> {simulationName}
              </div>
            )}
          </CardTitle>
          <CardDescription className="md:visible">({id})</CardDescription>
        </>
      ) : (
        <CardTitle>
          <TooltipText content={id}>
            <div className="flex flex-row gap-2">
              {index !== undefined && <SimulationBadge index={index} />}
              <p className="w-32 truncate md:w-full  md:whitespace-normal">
                {simulationName}
              </p>
            </div>
          </TooltipText>
        </CardTitle>
      )}
    </>
  );
};
