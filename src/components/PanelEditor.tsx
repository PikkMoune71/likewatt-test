"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { SolarPanel } from "../types/solarPanelTypes";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { solarPanelSchema } from "@/utils/solarPanelValidation";
import { useDispatch } from "react-redux";
import {
  deleteSolarPanel,
  updateSolarPanel,
} from "@/store/slices/solarPanelSlice";
import { AppDispatch } from "@/store/store";
import { Trash2 } from "lucide-react";

interface PanelEditorProps {
  selectedPanel: SolarPanel | null;
}

export const PanelEditor = ({ selectedPanel }: PanelEditorProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    model: selectedPanel?.model || "",
    tilt: selectedPanel?.tilt || 0,
    capacity: selectedPanel?.capacity || 0,
    isActive: selectedPanel?.isActive || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (selectedPanel) {
      setIsDeleted(false);
      setFormData({
        model: selectedPanel.model || "",
        tilt: selectedPanel.tilt || 0,
        capacity: selectedPanel.capacity || 0,
        isActive: selectedPanel.isActive || false,
      });
    }
  }, [selectedPanel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = solarPanelSchema.parse({
        ...formData,
        tilt: Number(formData.tilt),
        capacity: Number(formData.capacity),
      });

      if (selectedPanel) {
        const panelToUpdate = {
          ...selectedPanel,
          ...validatedData,
        };

        dispatch(updateSolarPanel(panelToUpdate));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleDelete = () => {
    if (selectedPanel) {
      dispatch(deleteSolarPanel(selectedPanel.id));
      setIsDeleted(true);
    }
  };

  if (isDeleted) {
    return (
      <div className="text-gray-500 text-center">
        Le panneau a été supprimé.
      </div>
    );
  }

  if (!selectedPanel) {
    return (
      <div className="text-gray-500 text-center">
        Sélectionnez un panneau pour modifier ses informations.
      </div>
    );
  }

  return (
    <Card className="rounded-xl p-4 h-96" style={{ height: "500px" }}>
      <div className="flex items-center justify-between flex-wrap mb-4">
        <h2 className="text-lg font-bold">
          Modifier le panneau {selectedPanel.model}
        </h2>
        {selectedPanel.id ? (
          <span className="text-sm text-gray-500">ID: {selectedPanel.id}</span>
        ) : (
          <span className="text-sm text-gray-500">ID: Inconnu</span>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="model" className="block text-sm font-medium">
            Modèle
          </Label>
          <Input
            type="text"
            id="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Nom du modèle"
          />
          {errors.model && (
            <p className="text-red-500 text-sm">{errors.model}</p>
          )}
        </div>

        <div>
          <Label htmlFor="tilt" className="block text-sm font-medium">
            Inclinaison (degrés)
          </Label>
          <Input
            type="number"
            id="tilt"
            value={formData.tilt}
            onChange={handleChange}
            min="0"
            max="180"
            placeholder="0 - 180"
          />
          {errors.tilt && <p className="text-red-500 text-sm">{errors.tilt}</p>}
        </div>

        <div>
          <Label htmlFor="capacity" className="block text-sm font-medium">
            Capacité (Kw)
          </Label>
          <Input
            type="number"
            id="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="0"
            placeholder="Capacité en Kw"
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm">{errors.capacity}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, isActive: !!checked }))
            }
          />
          <Label
            htmlFor="isActive"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Activer le panneau
          </Label>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="delete-button"
          >
            <Trash2 />
          </Button>
          <Button
            type="submit"
            className="save-button font-bold hover:bg-secondary"
          >
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </Card>
  );
};
