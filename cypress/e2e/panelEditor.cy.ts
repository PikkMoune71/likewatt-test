/// <reference types="cypress" />

describe("Tests E2E pour le composant PanelEditor", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Affiche un message lorsque aucun panneau n'est sélectionné", () => {
    cy.contains(
      "Sélectionnez un panneau pour modifier ses informations."
    ).should("be.visible");
  });

  it("Permet de modifier les informations d'un panneau et enregistre les modifications", () => {
    cy.get(".panel").first().click();

    cy.get("input#model").clear().type("Nouveau Modèle");
    cy.get("input#tilt").clear().type("45");
    cy.get("input#capacity").clear().type("20");

    cy.get('button[type="submit"]').click();

    cy.contains("Nouveau Modèle").should("be.visible");
    cy.contains("45").should("be.visible");
    cy.contains("20").should("be.visible");
  });

  it("Permet de supprimer un panneau", () => {
    cy.get(".panel").first().click();

    cy.get(".delete-button").click();

    cy.contains("Le panneau a été supprimé.").should("be.visible");

    cy.contains("Nouveau Modèle").should("not.exist");
  });

  it("Vérifie la validation des champs du formulaire", () => {
    cy.get(".panel").first().click();
    cy.get("input#model").clear();
    cy.get('button[type="submit"]').click();

    cy.contains("Le modèle est requis").should("be.visible");
  });
});
