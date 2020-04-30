const User = require('../models/user');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../index');


beforeEach(async()=> {
  await User.deleteMany({});
});

describe("Create user", () => {
  it("should create user on post user/singup and login him", async () => {
    const res = await request(app)
      .post("/user/signup")
      .send({
        email: "rubicone@cesare.com",
        password: "giulio"
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message");
    const res2 = await request(app)
    .post("/user/login")
    .send({
      email: "rubicone@cesare.com",
      password: "giulio"
    });
    expect(res2.status).to.equal(200);
  expect(res2.body).to.have.property("token");
  });
});
