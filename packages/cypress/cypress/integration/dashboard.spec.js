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
    cy.findByLabelText("Name").type("edit Task Name");
    cy.findByLabelText("Description").type("edit Task Description");
    cy.findByLabelText("Labels").type("EditLabel {enter}", { force: true });
    cy.findByTestId("submit-task-edit").click();
    cy.findByTestId("task-item-name").should("have.text", "edit Task Name");
    cy.screenshot();
  });

  it("can delete a task", () => {
    cy.visit("/");
    cy.findByTestId("task-item").click();
    cy.findByTestId("delete-task-edit").click();
    cy.findByTestId("task-item").should("have.length", 0);
    cy.screenshot();
  });

  it("can filter tasks by name", () => {
    cy.visit("/");

    cy.findByTestId("add-task-button").click();
    cy.findByLabelText("Name").type('AAA');
    cy.findByLabelText("Description").type('Z');
    cy.findByLabelText("Labels").type("Uni {enter}", { force: true });
    cy.findByTestId("submit-task-form").click();

    cy.findByTestId("add-task-button").click();
    cy.findByLabelText("Name").type('FFF');
    cy.findByLabelText("Description").type('F');
    cy.findByLabelText("Labels").type("Work {enter}", { force: true });
    cy.findByTestId("submit-task-form").click();

    cy.findByTestId("add-task-button").click();
    cy.findByLabelText("Name").type('ZZZ');
    cy.findByLabelText("Description").type('A');
    cy.findByLabelText("Labels").type("Sport {enter}", { force: true });
    cy.findByTestId("submit-task-form").click();
    
    cy.findByTestId("filter-name-button").type('z', { force: true });
    cy.findByTestId("task-item-name").should("have.text", "ZZZ");
    cy.findByTestId("task-item").click();
    cy.findByTestId("delete-task-edit").click();

    cy.screenshot();
  });

  it("can filter tasks by description", () => {
    cy.visit("/");

    cy.findByTestId("filter-description-button").type('f', { force: true });
    cy.findByTestId("task-item-name").should("have.text", "FFF");
    cy.findByTestId("task-item").click();
    cy.findByTestId("delete-task-edit").click();

    cy.screenshot();
  });

  it("can filter tasks by label", () => {
    cy.visit("/");

    cy.findByTestId("filter-label-button").type('Un', { force: true });
    cy.findByTestId("task-item-name").should("have.text", "AAA");
    cy.screenshot();
    cy.findByTestId("task-item").click();
    cy.findByTestId("delete-task-edit").click();
    

    cy.findByTestId("filter-label-button").clear();
  });

  it("can create a new Tracking", () => {
    sessionStorage.clear();

    const task = taskBuilder({})();
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId("add-task-button").click();
    cy.findByLabelText("Name").type(task.name);
    cy.findByLabelText("Description").type(task.description);
    cy.findByLabelText("Labels").type("TestLabel {enter}", { force: true });
    cy.findByTestId("submit-task-form").click();

    cy.findByTestId("task-tracking-start").click();

    cy.findByLabelText("Name").type(task.name);
    cy.findByLabelText("Description").type(task.description);
    cy.findByText("Start Tracking").click();
    cy.findByTestId("task-tracking-stop").click();

    cy.findByTestId("task-item-tracking").should("have.length", 1);

    cy.screenshot();

    cy.findByTestId("task-item").click();
    cy.findByTestId("delete-task-edit").click();
    
    sessionStorage.clear();
  });
  
  it("can start and pause Tracking", () => {
    sessionStorage.clear();

    const task = taskBuilder({})();
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId("add-task-button").click();
    cy.findByLabelText("Name").type(task.name);
    cy.findByLabelText("Description").type(task.description);
    cy.findByLabelText("Labels").type("TestLabel {enter}", { force: true });
    cy.findByTestId("submit-task-form").click();

    cy.findByTestId("task-tracking-start").click();
    cy.findByLabelText("Name").type(task.name);
    cy.findByLabelText("Description").type(task.description);
    cy.findByText("Start Tracking").click();
    cy.findByTestId("task-tracking-pause").click();

    cy.findByTestId("task-tracking-start").click();
    cy.findByLabelText("Name").type(task.name);
    cy.findByLabelText("Description").type(task.description);
    cy.findByText("Start Tracking").click();
    cy.findByTestId("task-tracking-pause").click();

    cy.findByTestId("task-tracking-start").click();
    cy.findByLabelText("Name").type(task.name);
    cy.findByLabelText("Description").type(task.description);
    cy.findByText("Start Tracking").click();
    cy.findByTestId("task-tracking-pause").click();
    cy.findByTestId("task-tracking-stop").click();

    cy.findByTestId("task-item-tracking").should("have.length", 1);

    cy.screenshot();

    cy.findByTestId("task-item").click();
    cy.findByTestId("delete-task-edit").click();
    
  });
});
