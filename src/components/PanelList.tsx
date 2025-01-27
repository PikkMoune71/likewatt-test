"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSolarPanels } from "../services/solarPanelsService";
import { setLoading, setSolarPanel } from "../store/solarPanelSlice";
import { SolarPanel } from "../types/solarPanelTypes";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface PanelListProps {
  onSelectPanel: (panel: SolarPanel) => void;
}

export const PanelList = ({ onSelectPanel }: PanelListProps) => {
  const dispatch = useDispatch();
  const panels = useSelector((state: any) => state.panels.data);
  const loading = useSelector((state: any) => state.panels.loading);
  const [selectedPanelId, setSelectedPanelId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPanels = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getSolarPanels();
        dispatch(setSolarPanel(response));
      } catch (error) {
        console.error("Failed to load panels", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchPanels();
  }, [dispatch]);

  const handleSelectPanel = (panel: SolarPanel) => {
    setSelectedPanelId(panel.id);
    onSelectPanel(panel);
  };

  return (
    <div>
      {loading ? (
        <div className="text-center">
          <p>Chargement...</p>
        </div>
      ) : (
        <>
          <ScrollArea className="h-96 w-full rounded-xl border bg-gray-50">
            <div className="flex flex-col gap-4">
              {panels.map((panel: SolarPanel, index: number) => (
                <Card
                  key={index}
                  className={`cursor-pointer bg-white shadow-md rounded-xl p-5 flex flex-col ${
                    selectedPanelId === panel.id
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelectPanel(panel)}
                  style={{
                    cursor:
                      selectedPanelId === panel.id ? "pointer" : "default",
                  }}
                >
                  <div className="flex justify-between items-center flex-wrap">
                    {panel.model ? (
                      <h2 className="text-lg font-bold">{panel.model}</h2>
                    ) : (
                      <h2
                        className={`text-lg font-bold text-red-500 ${
                          selectedPanelId === panel.id ? "text-white" : ""
                        }`}
                      >
                        Modèle inconnu
                      </h2>
                    )}
                    {panel.id && (
                      <span className=" text-sm">id: {panel.id}</span>
                    )}
                  </div>
                  <p>Inclinaison : {panel.tilt}°</p>
                  <p>
                    Capacité :{" "}
                    {panel.capacity ? (
                      <span>{panel.capacity} kW</span>
                    ) : (
                      <span>Inconnue</span>
                    )}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};
