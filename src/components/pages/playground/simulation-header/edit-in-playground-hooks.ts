import { useNavigate } from "react-router-dom";
import { useSimulationActions } from "../hooks/simulations-hooks";

export const useEditInPlayground = () => {
  const navigate = useNavigate();
  const { editInPlayground } = useSimulationActions();
  return () => {
    editInPlayground();
    navigate(`/playground`);
  };
};
