import { Validator } from "../validator";

describe("Validator", () => {
  it("should handle empty string input", () => {
    const validator = new Validator("");
    expect(validator).toBeDefined();
  });

  describe("isEmpty", () => {
    it("should return error for empty string", () => {
      const validator = new Validator("");
      expect(validator.isEmpty().getError()).toBe("Input is required");
      expect(validator.isEmpty().isValid()).toBe(false);
    });

    it("should return no-error if any string is passed", () => {
      const validator = new Validator("Something");
      expect(validator.isEmpty().getError()).toBeUndefined();
      expect(validator.isEmpty().isValid()).toBe(true);
    });
  });
});
