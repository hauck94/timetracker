import request from "supertest";
import { Label } from "../../src/entity/label";
import { Task } from "../../src/entity/task";
import { Helper } from "../helper";

describe("label", () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  
  it("should be able to create a new Label with Task", async (done) => {
    await helper.resetDatabase();

    request(helper.app)
      .post("/api/label")
      .send({
        name: "Test Label"
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe("Test Label");
        done();
      });
  });

  it("should be able to get all Labels", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get("/api/label")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(3);
        done();
      });
  });

  it("should be able to get a single Label by ID", async (done) => {
    await helper.resetDatabase();

    const label = new Label();
    label.name = "Test Label";

    const savedLabel = await helper.getRepo(Label).save(label);
    request(helper.app)
      .get(`/api/label/${savedLabel.id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe(savedLabel.name);
        expect(res.body.data.id).toBe(savedLabel.id);
        done();
      });
  });

  it("should be able to delete Label", async (done) => {
    await helper.resetDatabase();

    const label = new Label();
    label.name = "Test Label";

    const savedLabel = await helper.getRepo(Label).save(label);
    request(helper.app)
      .delete(`/api/label/${savedLabel.id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it("should be able to patch Label", async (done) => {
    await helper.resetDatabase();

    const label = new Label();
    label.name = "Test Label";

    const savedLabel = await helper.getRepo(Label).save(label);
    request(helper.app)
      .patch(`/api/label/${savedLabel.id}`)
      .send({
          name: "Patched Label",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe("Patched Label");
        expect(res.body.data.id).toBe(savedLabel.id);
        done();
      });
  });

  it("should be able to get all Tasks from a Label", async (done) => {
    await helper.resetDatabase();

    const label = new Label();
    label.name = "Test Label";

    const task1 = new Task();
    const task2 = new Task();

    task1.name = "Test Task 1";
    task2.name = "Test Task 2";

    const savedTask1 = await helper.getRepo(Task).save(task1);
    const savedTask2= await helper.getRepo(Task).save(task2);
    label.tasks = [];
    label.tasks.push(savedTask1, savedTask2);

    const savedLabel = await helper.getRepo(Label).save(label);
    request(helper.app)
      .get(`/api/label/tasks/${savedLabel.id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(2);
        done();
      });
  });

  it("should not be able to get a single Label with wrong ID", async (done) => {
    await helper.resetDatabase();

    const label = new Label();
    label.name = "Test Label";

    await helper.getRepo(Label).save(label);
    request(helper.app)
      .get(`/api/label/WRONG_ID`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it("should not be able to delete Label with wrong ID", async (done) => {
    await helper.resetDatabase();

    const label = new Label();
    label.name = "Test Label";

    await helper.getRepo(Label).save(label);
    request(helper.app)
      .delete(`/api/label/WRONG_ID`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it("should not be able to patch Label with wrong ID", async (done) => {
    await helper.resetDatabase();

    const label = new Label();
    label.name = "Test Label";

    await helper.getRepo(Label).save(label);
    request(helper.app)
      .patch(`/api/label/WRONG_ID`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });

  it("should not be able to get all Tasks with wrong ID", async (done) => {
    await helper.resetDatabase();

    const label = new Label();
    label.name = "Test Label";

    const task1 = new Task();
    const task2 = new Task();

    task1.name = "Test Task 1";
    task2.name = "Test Task 2";

    const savedTask1 = await helper.getRepo(Task).save(task1);
    const savedTask2= await helper.getRepo(Task).save(task2);
    label.tasks = [];
    label.tasks.push(savedTask1, savedTask2);

    await helper.getRepo(Label).save(label);
    request(helper.app)
      .get(`/api/label/tasks/WRONG_ID`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err) => {
        if (err) throw err;
        done();
      });
  });
});