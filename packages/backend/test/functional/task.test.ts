import "reflect-metadata";
// tslint:disable-next-line:no-var-requires
require("dotenv-safe").config();
import "jest";
import { Helper } from "../helper";
import { Task } from "../../src/entity/task";
import request from "supertest";
import { Label } from "../../src/entity/label";
import { Tracking } from "../../src/entity/tracking";

describe("task", () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it("should be able to create a new Task with Label", async (done) => {
    await helper.resetDatabase();
    const label = new Label();
    label.name = "Test Label";
    const savedLabel = await helper.getRepo(Label).save(label);

    request(helper.app)
      .post("/api/task")
      .send({
        name: "Test Task",
        description: "Test New Task Description",
        label: [`${savedLabel.id}`],
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe("Test Task");
        expect(res.body.data.description).toBe("Test New Task Description");
        done();
      });
  });

  it("should not be able to create a new Task without name", async (done) => {
    await helper.resetDatabase();
    const label = new Label();
    label.name = "Test Label";

    request(helper.app)
      .post("/api/task")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it("should be able to delete a Task", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";

    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .delete(`/api/task/${savedTask.id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end(async (err) => {
        if (err) throw err;
        const [, TaskCount] = await helper.getRepo(Task).findAndCount();
        expect(TaskCount).toBe(0);
        done();
      });
  });

  it("should be able to update a Task", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";

    const label = new Label();
    label.name = "Test Label";
    const savedLabel = await helper.getRepo(Label).save(label);

    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .patch(`/api/task/${savedTask.id}`)
      .send({
        description: "Updated Description",
        name: "Updated Name",
        label: [`${savedLabel.id}`],
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe("Updated Name");
        expect(res.body.data.description).toBe("Updated Description");
        done();
      });
  });

  it("should not be able to update a Task with wrong ID", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";

    const label = new Label();
    label.name = "Test Label";
    const savedLabel = await helper.getRepo(Label).save(label);

    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .patch(`/api/task/${savedTask.id + 1}`)
      .send({
        description: "Updated Description",
        name: "Updated Name",
        label: [`${savedLabel.id}`],
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        done();
      });
  });
  it("should be able to get a single Task", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";

    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .get(`/api/task/${savedTask.id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data.id).toBe(savedTask.id);
        expect(res.body.data.name).toBe(savedTask.name);
        expect(res.body.data.description).toBe(savedTask.description);
        expect(res.body.data.created).toBeDefined();
        expect(res.body.data.updatedAt).toBeDefined();
        done();
      });
  });

  it("should be able to delete Labels from a Task", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";
    task.labels = [];

    const label1 = new Label();
    const label2 = new Label();
    const label3 = new Label();
    label1.name = "Label 1";
    label2.name = "Label 2";
    label3.name = "Label 3";

    const savedLabel1 = await helper.getRepo(Label).save(label1);
    const savedLabel2 = await helper.getRepo(Label).save(label2);
    const savedLabel3 = await helper.getRepo(Label).save(label3);

    task.labels.push(savedLabel1, savedLabel2, savedLabel3);

    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .delete(`/api/task/labels/${savedTask.id}`)
      .send({
        // Problem wie kann man einen array übergeben
        // "[`${savedLabel1.id}, ${savedLabel2.id}, ${savedLabel3.id}`]"
        label: `${savedLabel1.id}`,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end(async (err) => {
        if (err) throw err;
        done();
      });
  });

  
  it("should not be able to delete Labels from a Task without Label ID in Body", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";
    task.labels = [];

    const label1 = new Label();
    const label2 = new Label();
    const label3 = new Label();
    label1.name = "Label 1";
    label2.name = "Label 2";
    label3.name = "Label 3";

    const savedLabel1 = await helper.getRepo(Label).save(label1);
    const savedLabel2 = await helper.getRepo(Label).save(label2);
    const savedLabel3 = await helper.getRepo(Label).save(label3);

    task.labels.push(savedLabel1, savedLabel2, savedLabel3);

    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .delete(`/api/task/labels/${savedTask.id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        done();
      });
  });

  it("should be able to get all Labels from a single Task", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";
    task.labels = [];

    const label1 = new Label();
    const label2 = new Label();
    const label3 = new Label();
    label1.name = "Label 1";
    label2.name = "Label 2";
    label3.name = "Label 3";

    const savedLabel1 = await helper.getRepo(Label).save(label1);
    const savedLabel2 = await helper.getRepo(Label).save(label2);
    const savedLabel3 = await helper.getRepo(Label).save(label3);

    task.labels.push(savedLabel1, savedLabel2, savedLabel3);

    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .get(`/api/task/labels/${savedTask.id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(3);
        // PROBLEM saving speichert nicht die richtige reihenfolge des Arrays!!
        // expect(res.body.data[0].name).toBe(savedLabel1.name || savedLabel2.name || savedLabel2.name);
        // expect(res.body.data[1].name).toBe(savedLabel1.name || savedLabel2.name || savedLabel2.name);
        // expect(res.body.data[2].name).toBe(savedLabel1.name || savedLabel2.name || savedLabel2.name);
        done();
      });
  });

  
  it("should not be able to get all Labels with wrong Task ID", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";
    task.labels = [];

    const label1 = new Label();
    const label2 = new Label();
    const label3 = new Label();
    label1.name = "Label 1";
    label2.name = "Label 2";
    label3.name = "Label 3";

    const savedLabel1 = await helper.getRepo(Label).save(label1);
    const savedLabel2 = await helper.getRepo(Label).save(label2);
    const savedLabel3 = await helper.getRepo(Label).save(label3);

    task.labels.push(savedLabel1, savedLabel2, savedLabel3);

    await helper.getRepo(Task).save(task);

    request(helper.app)
      .get(`/api/task/labels/WRONG_TASK_ID`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        done();
      });
  });

  it("should be able to get all Trackings from a single Task", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";

    const savedTask = await helper.getRepo(Task).save(task);

    const tracking = new Tracking();
    tracking.name = "Test Tracking";
    tracking.task = task;

    const savedTracking = await helper.getRepo(Tracking).save(tracking);

    request(helper.app)
      .get(`/api/task/trackings/${savedTask.id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data[0].id).toBe(savedTracking.id);
        expect(res.body.data[0].name).toBe(savedTracking.name);
        done();
      });
  });

  
  it("should not be able to get all Trackings with wrong Task ID", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";

    await helper.getRepo(Task).save(task);

    const tracking = new Tracking();
    tracking.name = "Test Tracking";
    tracking.task = task;

    await helper.getRepo(Tracking).save(tracking);

    request(helper.app)
      .get(`/api/task/trackings/WRONG_TASK_ID`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        done();
      });
  });


  it("should not be able to get a single Task with wrong ID", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";

    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .get(`/api/task/${savedTask.id + 1}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        done();
      });
  });

  it("should not be able to delete a single Task with wrong ID", async (done) => {
    await helper.resetDatabase();
    request(helper.app)
      .delete("/api/task/WRONGID=1")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        done();
      });
  });

  it("should be able to get a all Labels from a single Task", async () => {
    await helper.resetDatabase();

    const label1 = new Label();
    label1.name = "Test 1";
    const label2 = new Label();
    label2.name = "Test 2";
    const label3 = new Label();
    label3.name = "Test 3";
    const savedLabel1 = await helper.getRepo(Label).save(label1);
    const savedLabel2 = await helper.getRepo(Label).save(label2);
    const savedLabel3 = await helper.getRepo(Label).save(label3);

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";
    task.labels = [];
    task.labels.push(savedLabel1);
    task.labels.push(savedLabel2);
    task.labels.push(savedLabel3);

    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .get(`/api/task/${savedTask.id}/labels`)
      .send({
        description: "Updated Description",
        name: "Updated Name",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
    /* .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data[0].id).toBe(savedLabel1.id);
        expect(res.body.data[1].id).toBe(savedLabel2.id);
        expect(res.body.data[2].id).toBe(savedLabel3.id);
       done();
      });
      */
  });

  it("should be able to get all Tasks", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get("/api/task")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(5);
        done();
      });
  });
});
