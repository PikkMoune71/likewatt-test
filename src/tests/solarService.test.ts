import { getSolarPanels } from "../services/solarPanelsService";
import axios from "../utils/solarAPI";

jest.mock("../utils/solarAPI");

describe("getSolarPanels", () => {
  it("devrait retourner la liste des panneaux solaires", async () => {
    const mockPanels = [
      { id: "1", model: "MARKETOID", tilt: 65, capacity: 22, isActive: true },
      { id: "2", model: "SOLARPRO", tilt: 45, capacity: 30, isActive: false },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: { data: mockPanels } });

    const panels = await getSolarPanels();

    expect(axios.get).toHaveBeenCalledWith("/"); // Vérifie que la requête est envoyée à l'URL correcte
    expect(panels).toEqual(mockPanels); // Vérifie que les données retournées correspondent à celles simulées
  });

  it("devrait gérer un cas où la réponse ne contient pas un tableau de panneaux", async () => {
    const invalidResponse = { data: { data: null } };

    (axios.get as jest.Mock).mockResolvedValue(invalidResponse);

    const panels = await getSolarPanels();

    expect(axios.get).toHaveBeenCalledWith("/");
    expect(panels).toBeNull(); // Vérifie que la fonction retourne `null` si les données sont invalides
  });

  it("devrait gérer le cas où la réponse met du temps (simulation de délai)", async () => {
    const mockPanels = [
      { id: "1", model: "MARKETOID", tilt: 65, capacity: 22, isActive: true },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockPanels },
    });

    const panels = await getSolarPanels();
    expect(panels).toEqual(mockPanels);
    expect(axios.get).toHaveBeenCalledWith("/");
  });

  it("devrait lever une erreur si la requête échoue", async () => {
    const mockError = new Error("Erreur réseau");
    (axios.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getSolarPanels()).rejects.toThrow("Erreur réseau");
    expect(axios.get).toHaveBeenCalledWith("/");
  });
});
