import request from "supertest";
import { Task } from "../../src/entity/task";
import { Tracking } from "../../src/entity/tracking";
import { Helper } from "../helper";

describe("task", () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it("should be able to create a new Tracking", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Task description";
    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .post(`/api/tracking/${savedTask.id}`)
      .send({
        name: "Test Tracking",
        description: "Test Tracking description",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe("Test Tracking");
        expect(res.body.data.description).toBe("Test Tracking description");
        expect(res.body.data.task.id).toBe(savedTask.id);
        expect(res.body.data.task.name).toBe(savedTask.name);
        done();
      });
  });

  
  it("should not be able to create a new Tracking without Body Data", async (done) => {
    await helper.resetDatabase();

    request(helper.app)
      .post(`/api/tracking/NO_TASK`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it("should be able to patch a Tracking", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Task description";
    const savedTask = await helper.getRepo(Task).save(task);

    const tracking = new Tracking();
    tracking.name = "Test Tracking";
    tracking.task = savedTask;

    const savedTracking = await helper.getRepo(Tracking).save(tracking);

    request(helper.app)
      .patch(`/api/tracking/${savedTracking.id}`)
      .send({
        description: "Updated Description",
        name: "Updated Name",
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

  it("should not be able to patch a Tracking with wrong ID", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Task description";
    const savedTask = await helper.getRepo(Task).save(task);

    const tracking = new Tracking();
    tracking.name = "Test Tracking";
    tracking.task = savedTask;

    await helper.getRepo(Tracking).save(tracking);

    request(helper.app)
      .patch(`/api/tracking/WRONG_ID`)
      .send({
        description: "Updated Description",
        name: "Updated Name",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end(async (err) => {
        if (err) throw err;
        done();
      });
  });


  it("should be able to get all Trackings", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get("/api/tracking")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(5);
        done();
      });
  });

  it("should be able to get a single Tracking by ID", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Task description";
    const savedTask = await helper.getRepo(Task).save(task);

    const tracking = new Tracking();
    tracking.name = "Test Tracking";
    tracking.task = savedTask;

    const savedTracking = await helper.getRepo(Tracking).save(tracking);
    request(helper.app)
      .get(`/api/tracking/${savedTracking.id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe(tracking.name);
        expect(res.body.data.description).toBe(tracking.description);
        expect(res.body.data.id).toBe(tracking.id);
        done();
      });
  });

  
  it("should not be able to get a single Tracking with wrong ID", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Task description";
    const savedTask = await helper.getRepo(Task).save(task);

    const tracking = new Tracking();
    tracking.name = "Test Tracking";
    tracking.task = savedTask;

    await helper.getRepo(Tracking).save(tracking);
    request(helper.app)
      .get(`/api/tracking/WRONG_TASK_ID`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it("should be able to delete a single Tracking by ID", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Task description";
    const savedTask = await helper.getRepo(Task).save(task);

    const tracking = new Tracking();
    tracking.name = "Test Tracking";
    tracking.task = savedTask;

    const savedTracking = await helper.getRepo(Tracking).save(tracking);

    request(helper.app)
      .delete(`/api/tracking/${savedTracking.id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data).toBeUndefined;
        done();
      });
  });

  it("should not be able to delete a single Tracking with wrong ID", async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = "Test Task";
    task.description = "Task description";
    const savedTask = await helper.getRepo(Task).save(task);

    const tracking = new Tracking();
    tracking.name = "Test Tracking";
    tracking.task = savedTask;

    await helper.getRepo(Tracking).save(tracking);

    request(helper.app)
      .delete(`/api/tracking/WRONG_ID`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it("should not be able to create a new Tracking without Task", async (done) => {
    await helper.resetDatabase();

    request(helper.app)
      .post(`/api/tracking`)
      .send({
        name: "Test Tracking",
        description: "Test Tracking description",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});
