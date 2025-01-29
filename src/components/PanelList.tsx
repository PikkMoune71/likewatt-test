"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/slices/solarPanelSlice";
import { SolarPanel } from "../types/solarPanelTypes";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { fetchSolarPanels } from "@/store/actions/solarPanelsAction";
import { AppDispatch } from "@/store/store";
import Loader from "./Loader";

interface PanelListProps {
  onSelectPanel: (panel: SolarPanel) => void;
}

export const PanelList = ({ onSelectPanel }: PanelListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const panels = useSelector((state: any) => state.panels.data);
  const loading = useSelector((state: any) => state.panels.loading);
  const [selectedPanelId, setSelectedPanelId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPanels = async () => {
      dispatch(setLoading(true));
      try {
        dispatch(fetchSolarPanels());
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
        <Loader label="Chargement des panneaux solaires" />
      ) : (
        <>
          <ScrollArea
            className="w-full rounded-xl border bg-gray-50 p-2"
            style={{ height: "500px" }}
          >
            <div className="flex flex-col gap-4">
              {panels.map((panel: SolarPanel, index: number) => (
                <Card
                  key={index}
                  className={`panel cursor-pointer bg-white shadow-xl rounded-xl p-5 flex flex-col ${
                    selectedPanelId === panel.id
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  } ${
                    !panel.isActive
                      ? "border-2 border-secondary"
                      : "border-2 border-green-600"
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
                    {!panel.isActive ? (
                      <span className="text-secondary font-bold uppercase">
                        Inactif
                      </span>
                    ) : (
                      <span className="text-green-600 font-bold uppercase">
                        Actif
                      </span>
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
