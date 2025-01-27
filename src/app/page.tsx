"use client";
import { useState } from "react";
import { PanelList } from "../components/PanelList";
import WeatherForecast from "@/components/WeatherForecast";
import { SolarPanel } from "@/types/solarPanelTypes";
import { PanelEditor } from "@/components/PanelEditor";

export default function Home() {
  const [selectedPanel, setSelectedPanel] = useState<SolarPanel | null>(null);

  const handleSelectPanel = (panel: SolarPanel) => {
    setSelectedPanel(panel);
  };

  const handleUpdatePanel = (updatedPanel: SolarPanel) => {
    console.log("Updated panel:", updatedPanel);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Liste des panneaux solaires</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 items-start">
        <PanelList onSelectPanel={handleSelectPanel} />
        <PanelEditor
          selectedPanel={selectedPanel}
          onUpdate={handleUpdatePanel}
        />
      </div>
      <div className="mt-8">
        <WeatherForecast />
      </div>
    </div>
  );
}
