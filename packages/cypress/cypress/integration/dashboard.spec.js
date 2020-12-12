import "@testing-library/cypress/add-commands";
import { taskBuilder } from "../builder/Task";

describe("DashboardPage", () => {
  it("can create a new task", () => {
    const task = taskBuilder({})();
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId("add-task-button").click();
    cy.findByLabelText("Name").type(task.name);
    cy.findByLabelText("Description").type(task.description);
    cy.findByLabelText("Labels").type("TestLabel {enter}", { force: true });
    cy.findByTestId("submit-task-form").click();
    cy.findByTestId("task-item").should("have.length", 1);
    cy.screenshot();
  });

  it("can edit a task", () => {
    cy.visit("/");
    cy.findByTestId("task-item").click();
    cy.findByLabelText("Name").clear();
    cy.findByLabelText("Description").clear();
    cy.findByLabelText("Name").type('edit Task Name');
    cy.findByLabelText("Description").type('edit Task Description');
    cy.findByLabelText("Labels").type("EditLabel {enter}", { force: true });
    cy.findByTestId("submit-task-edit").click();
    cy.findByTestId("task-item-name").should("have.text", 'edit Task Name');
    cy.screenshot();
  });

  it("can delete a task", () => {
    cy.visit("/");
    cy.findByTestId("task-item").click();
    cy.findByTestId("delete-task-edit").click();
    cy.findByTestId("task-item").should("have.length", 0);
    cy.screenshot();
  });
  
});
