"use client";

import { SolarPanel } from "../types/solarPanelTypes";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";

interface PanelEditorProps {
  selectedPanel: SolarPanel | null;
  onUpdate: (updatedPanel: SolarPanel) => void;
}

export const PanelEditor = ({ selectedPanel, onUpdate }: PanelEditorProps) => {
  if (!selectedPanel) {
    return (
      <div className="text-gray-500 text-center">
        Sélectionnez un panneau pour modifier ses informations.
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedPanel) {
      onUpdate({ ...selectedPanel, [name]: value });
    }
  };

  const handleSubmit = () => {
    console.log("Updated panel:", selectedPanel);
  };

  return (
    <Card className="rounded-xl p-4">
      <h2 className="text-lg font-bold mb-4">
        Modifier le panneau {selectedPanel.model}
      </h2>
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="model" className="block text-sm font-medium">
            Modèle
          </Label>
          <input
            type="text"
            id="model"
            name="model"
            value={selectedPanel.model || ""}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <Label htmlFor="tilt" className="block text-sm font-medium">
            Inclinaison
          </Label>
          <input
            type="number"
            id="tilt"
            name="tilt"
            value={selectedPanel.tilt || ""}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <Label htmlFor="capacity" className="block text-sm font-medium">
            Capacité
          </Label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={selectedPanel.capacity || ""}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="mt-4 font-bold hover:bg-secondary"
        >
          Enregistrer les modifications
        </Button>
      </div>
    </Card>
  );
};
