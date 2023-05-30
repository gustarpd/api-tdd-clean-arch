import bcrypt from "bcrypt";

class Encrypter {
  async compare(value, hashed_value) {
    const isValid = bcrypt.compare(value, hashed_value);
    return isValid;
  }
}

describe("Encrypter", () => {
  test("Should return true if bcrypty returns true", async () => {
    const sut = new Encrypter();
    const isValid = await sut.compare("any_value", "any_value");
    expect(isValid).toBe(true);
  });

  test("Should return true if bcrypty returns true", async () => {
    const sut = new Encrypter();
    bcrypt.isValid = false;
    const isValid = await sut.compare("password", "hashed_pass");
    expect(isValid).toBe(false);
  });

  test("Should call bcrypt with correct values", async () => {
    const sut = new Encrypter();
    await sut.compare("any_value", "hashed_value");
    expect(bcrypt.value).toBe('any_value');
    expect(bcrypt.hashed_value).toBe('hashed_value');
  });
});
