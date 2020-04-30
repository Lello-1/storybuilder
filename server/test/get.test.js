// npm i express mocha chai supertest nyc mongoose sinon --save
// plus modify package.json with
//  "scripts": {
//   "start": "nodemon",
//   "test": "mocha --recursive"  
// },

// changed check-auth: ...module.exports.miao = (req, res, next) => {

// changed router router.get('/stories', checkAuth.miao, story.getStories); and all the others too

// to test  npx mocha --timeout 10000 --exit

const Story = require('../models/story');
const User = require('../models/user');
const request = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');
const auth = require('../middleware/check-auth');
sinon.stub(auth, "miao").callsFake((req, res, next) => next());
const app = require('../index');

beforeEach(async () => {
  await Story.deleteMany({});
  await User.deleteMany({});
})

describe("GET STORIES", () => {
  it("should return all stories", async () => {
    const stories = [
      { title: "post1", year: "2020" },
      { title: "post2", year: "2021", description: "i'm from future", photos: ["cat", "dog"] },
    ];
    await Story.insertMany(stories);
    const res = await request(app).get("/stories");
    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(2);
  })
});

describe("POST STORIES", () => {
  it("should return user when the all request body is valid", async () => {
    const res = await request(app)
      .post("/stories")
      .send({
        title: "post2", year: "2021", description: "i'm from future", photos: ["cat", "dog"]
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("title", "post2");
  });
});

describe("DELETE USER", () => {
  it("should delete requested id and return response 200", async () => {
    const user = new User({
      email: "trol@gmail.com",
      password: "dmiosOImad1m"
    });
    await user.save();

    const res = await request(app).delete("/user/" + user._id);
    expect(res.status).to.be.equal(200);
  });

  it("should return 404 when deleted user is requested", async () => {
    const user = new User({
      email: "trol@gmail.com",
      password: "dmiosOImad1m"
    });
    await user.save();

    let res = await request(app).delete("/user/" + user._id);
    expect(res.status).to.be.equal(200);

    res = await request(app).get("/user/" + user._id);
    expect(res.status).to.be.equal(404);
  });

});
