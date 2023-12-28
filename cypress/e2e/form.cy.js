/// <reference types="Cypress"/>

describe("Card form tests", () => {
  before(() => {
    cy.visit("index.html");
  });

  it("Verify that the main page items are showing", () => {
    cy.get(".front").should("be.visible");
    cy.get(".back").should("be.visible");
    cy.get("#card-form").should("be.visible");

    cy.get(".bg-mobile").should("not.be.visible");
    cy.get(".submitted-status").should("not.be.visible");
  });

  it("Fail form validations (blank fields)", () => {
    cy.get("#btn-confirm").click();

    cy.get(".text-error").then((error) => {
      error.each((i, text) => {
        cy.get(text).contains("This field cannot be blank");
      });
    });
  });

  it("Fail form validations (invalid inputs)", () => {
    cy.get("#name").type("Jesus123");
    cy.get("#card-number").type("08231243abc");
    cy.get("#MM").type("ab");
    cy.get("#YY").type("cd");
    cy.get("#CVC").type("12f");

    cy.get("#btn-confirm").click();

    cy.get("#nameError").contains("This field can only contain letters");
    cy.get("#cardNumberError").contains("Invalid credit card number");
    cy.get("#MMerror").contains("Invalid month format");
    cy.get("#YYerror").contains("Invalid year format");
    cy.get("#cvcError").contains("Invalid CVC format");
  });

  it("Pass form validations (correct inputs)", () => {
    cy.reload();

    cy.get("#name").type("Agustin Sanchez");
    cy.get("#card-number").type("1234123412341234");
    cy.get("#MM").type("12");
    cy.get("#YY").type("23");
    cy.get("#CVC").type("777");

    cy.get("#btn-confirm").click();
    cy.get("#btn-continue").click();
  });
});
