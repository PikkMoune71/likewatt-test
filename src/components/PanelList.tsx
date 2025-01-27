import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSolarPanels } from "../services/solarService";
import { setLoading, setPanels } from "../store/panelSlice";
import { Panel } from "../types/Panel";

export const PanelList = () => {
  const dispatch = useDispatch();
  const panels = useSelector((state: any) => state.panels.data);
  const loading = useSelector((state: any) => state.panels.loading);

  useEffect(() => {
    const fetchPanels = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getSolarPanels();
        dispatch(setPanels(response));
      } catch (error) {
        console.error("Failed to load panels", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchPanels();
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <div className="text-center">
          <p>Chargement...</p>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold text-center">Panneaux solaires</h1>
          <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {panels.map((panel: Panel, index: any) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-md p-4 flex flex-col"
              >
                <h2 className="text-lg font-bold">{panel.model}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
