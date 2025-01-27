import { getSolarPanels } from "../services/solarPanelsService";
import axios from "../utils/solarAPI";

// Mock de la méthode axios.get
jest.mock("../utils/solarAPI");

describe("getSolarPanels", () => {
  it("devrait retourner la liste des panneaux solaires", async () => {
    // Données simulées de la réponse de l'API
    const mockPanels = [
      { id: "1", model: "MARKETOID", tilt: 65, capacity: 22, isActive: true },
      { id: "2", model: "SOLARPRO", tilt: 45, capacity: 30, isActive: false },
    ];

    // Simuler la réponse d'Axios
    (axios.get as jest.Mock).mockResolvedValue({ data: mockPanels });

    // Appeler la fonction
    const panels = await getSolarPanels();

    // Vérification des appels et des résultats
    expect(axios.get).toHaveBeenCalledWith("/"); // Vérifie que la requête est envoyée à l'URL correcte
    expect(panels).toEqual(mockPanels); // Vérifie que les données retournées correspondent à celles simulées
  });
});
