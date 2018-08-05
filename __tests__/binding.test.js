import { expect } from "chai";
import userBinding from "../src";

describe("User Binding", function() {
  it("should return an empty array on first query", async function() {
    expect(await userBinding.query.users()).to.eql([]);
  });

  it("should return a user after creating one", async function() {
    const user = await userBinding.mutation.createUser({ name: 'Abhi Aiyer' });
    expect(user.name).to.eql('Abhi Aiyer');
  });

  it("should return users from query", async function() {
    const users = await userBinding.query.users()
    expect(users.length).to.eql(1);
  });
});
