import "reflect-metadata";
// tslint:disable-next-line:no-var-requires
require("dotenv-safe").config();
import "jest";
import { Helper } from "../helper";
import { Task } from "../../src/entity/task";
import request from "supertest";
import { Label } from "../../src/entity/label";

describe("task", () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it("should be able to create a new Task without Label and Trackings", async (done) => {
    await helper.resetDatabase();
    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";
    const savedTask = await helper.getRepo(Task).save(task);
    request(helper.app)
      .get("/api/task")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].name).toBe(savedTask.name);
        expect(res.body.data[0].description).toBe(savedTask.description);
        expect(res.body.data[0].id).toBe(savedTask.id);
        done();
      });
  });

  it("should be able to create a new Task with Label", async (done) => {
    await helper.resetDatabase();

    const label = new Label();
    label.name = "Test Label";
    const savedLabel = await helper.getRepo(Label).save(label);

    const task = new Task();
    task.name = "Test Task";
    task.description = "Das ist ein Test Task";
    task.labels = [];
    task.labels.push(savedLabel);
    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .get("/api/task")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].name).toBe(savedTask.name);
        expect(res.body.data[0].description).toBe(savedTask.description);
        expect(res.body.data[0].id).toBe(savedTask.id);
        expect(res.body.data[0].labels[0].name).toBe(savedLabel.name);
        expect(res.body.data[0].labels[0].id).toBe(savedLabel.id);
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

    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .patch(`/api/task/${savedTask.id}`)
      .send({
        description: 'Updated Description',
        name: 'Updated Name',
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe('Updated Name');
        expect(res.body.data.description).toBe('Updated Description');
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
      .send({
        description: 'Updated Description',
        name: 'Updated Name',
      })
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

 
  it("should be able to get a all Labels from a single Task", async (done) => {
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
      .get(`${savedTask.id}/labels`)
      .send({
        description: 'Updated Description',
        name: 'Updated Name',
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data[0].id).toBe(savedLabel1.id);
        expect(res.body.data[1].id).toBe(savedLabel2.id);
        expect(res.body.data[2].id).toBe(savedLabel3.id);
        done();
      });
  });

});
