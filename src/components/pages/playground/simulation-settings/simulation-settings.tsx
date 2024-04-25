import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMedia } from "react-use";
import { SettingsForm } from "./settings-form";
import { useSimulationName } from "../hooks/name-hooks";
import { useSettingsOpen } from "./settings-open";

type SimulationSettingsProps = {
  id: string;
};

export const SimulationSettings: React.FC<SimulationSettingsProps> = ({
  id,
}) => {
  const simulationName = useSimulationName(id);

  const {
    isOpen,
    actions: { onClose, onOpen },
  } = useSettingsOpen();
  const isDesktop = useMedia("(min-width: 768px)");

  return isDesktop ? (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => (open ? onOpen() : onClose())}
    >
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Edit {simulationName}</DialogTitle>
        </DialogHeader>
        <SettingsForm id={id} />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer
      open={isOpen}
      onOpenChange={(open: boolean) => (open ? onOpen() : onClose())}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit {simulationName}</DrawerTitle>
        </DrawerHeader>
        <SettingsForm id={id} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
