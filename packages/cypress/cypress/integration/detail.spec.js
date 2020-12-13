import "@testing-library/cypress/add-commands";
import { taskBuilder } from "../builder/Task";

describe("Detail Page", () => {
  it("can create a new Tracking", () => {
    const task = taskBuilder({})();
    cy.visit("/");
    cy.findByTestId("add-task-button").click();
    cy.findByLabelText("Name").type(task.name);
    cy.findByLabelText("Description").type(task.description);
    cy.findByLabelText("Labels").type("TestLabel {enter}", { force: true });
    cy.findByTestId("submit-task-form").click();

    cy.findByTestId("task-tracking-edit").click();
    cy.findByTestId("add-tracking-button").click();

    cy.findByLabelText("Name").type(task.name);
    cy.findByLabelText("Description").type(task.description);
    cy.findByTestId("submit-add-tracking").click();
    cy.findByTestId("tracking-item").should("have.length", 1);
    cy.screenshot();
  });

  it("can edit a Tracking", () => {
    cy.visit("/");
    cy.findByTestId("task-tracking-edit").click();
    
    cy.screenshot();
    cy.findByTestId("tracking-item").click();

    cy.findByLabelText("StartedAt").type("00:00:00");
    cy.findByLabelText("EndedAt").type("00:00:36");
    cy.findByTestId("submit-tracking-form").click();

    cy.findByTestId("tracking-item-started").should("have.text", "started: 00:00:00");
    cy.findByTestId("tracking-item-ended").should("have.text", "ended: 00:00:36");

    cy.screenshot();

});

it("can delete a Tracking", () => {
    cy.visit("/");
    cy.findByTestId("task-tracking-edit").click();

    cy.screenshot();
    cy.findByTestId("tracking-item").click();
    cy.findByTestId("delete-tracking-form").click();
    cy.findByTestId("tracking-item").should("have.length", 0);

    cy.screenshot();

    cy.visit("/");
    cy.findByTestId("task-item").click();
    cy.findByTestId("delete-task-edit").click();
});
});
