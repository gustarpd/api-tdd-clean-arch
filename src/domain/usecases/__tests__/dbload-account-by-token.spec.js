import { DbLoadAccountByToken } from "../../usecases/dbload-account-by-token";

const makeDbLoadAccountByTokenRepository = () => {
  class DbLoadAccountByTokenRepository {
    async load(accessToken) {
      this.accessToken = accessToken;
      return this.user;
    }
  }

  const dbLoadAccountByTokenRepository = new DbLoadAccountByTokenRepository();
  dbLoadAccountByTokenRepository.user = {
    name: "any_name",
    email: "any_email",
  };
  return dbLoadAccountByTokenRepository;
};

const makeTokenDecrypter = () => {
  class TokenDecrypter {
    async decrypter(hash) {
      this.hash = hash;
      return this.hashUndefined;
    }
  }

  const tokenDecrypter = new TokenDecrypter();
  return tokenDecrypter;
};

const makeSut = () => {
  const dbLoadAccountByTokenRepository = makeDbLoadAccountByTokenRepository();
  const tokenDecrypter = makeTokenDecrypter();
  const dbLoadAccountByToken = new DbLoadAccountByToken(
    dbLoadAccountByTokenRepository,
    tokenDecrypter
  );
  return {
    dbLoadAccountByToken,
    tokenDecrypter,
    dbLoadAccountByTokenRepository,
  };
};

describe("DbLoadAccountByToken", () => {
  describe("loadUser", () => {
    test("should return the decrypted user if access token is provided and valid", async () => {
      const validAccessToken = "valid-access-token";
      const decryptedUser = { id: 1, name: "John Doe" };
      const decryperMock = {
        decrypt: jest.fn().mockResolvedValue(decryptedUser),
      };
      const dbLoadAccountByTokenRepositoryMock = {
        load: jest.fn().mockResolvedValue(decryptedUser),
      };
      const dbLoadAccountByToken = new DbLoadAccountByToken(
        dbLoadAccountByTokenRepositoryMock,
        decryperMock
      );
    
      const result = await dbLoadAccountByToken.loadUser(validAccessToken);
    
      expect(decryperMock.decrypt).toHaveBeenCalledWith(validAccessToken);
      expect(result).toEqual(decryptedUser);
    });
    

    test("should return null if access token is not provided", async () => {
      const dbLoadAccountByToken = new DbLoadAccountByToken();
      const result = await dbLoadAccountByToken.loadUser();
      expect(result).toBeNull();
    });

    it("should return null if an error occurs during decryption", async () => {
      const invalidAccessToken = "invalid-access-token";
      const decryptionError = new Error("Decryption error");
      const decryperMock = {
        decrypt: jest.fn().mockRejectedValue(decryptionError),
      };
      const dbLoadAccountByToken = new DbLoadAccountByToken(null, decryperMock);
      const result = await dbLoadAccountByToken.loadUser(invalidAccessToken);
      expect(decryperMock.decrypt).toHaveBeenCalledWith(invalidAccessToken);
      expect(result).toBeNull();
    });

    test("should return null if access token is provided but no user is found in the repository", async () => {
      const validAccessToken = "valid-access-token";
      const dbLoadAccountByTokenRepositoryMock = {
        load: jest.fn().mockResolvedValue(null),
      };
      const dbLoadAccountByToken = new DbLoadAccountByToken(
        dbLoadAccountByTokenRepositoryMock,
        null
      );
      const result = await dbLoadAccountByToken.loadUser(validAccessToken);
      expect(result).toBeNull();
    });
  });
});
