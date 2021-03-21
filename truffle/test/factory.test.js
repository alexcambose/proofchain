const Factory = artifacts.require("Factory");

contract("Factory", () => {
  describe("Constructor", () => {
    it("contains the factory contract", async () => {
      const instance = await Factory.deployed();

      expect(instance).to.not.equal(undefined);
    });
  });
});
