import { JsonWebTokenError } from "jsonwebtoken";
import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { HttpResponse } from "../../helpers/httpReponse.js";

const makeAddDocumentUseCase = () => {
  class AddDocumentUseCase {
    async execute(document) {
      return this.data;
    }
  }

  const addDocument = new AddDocumentUseCase();
  addDocument.data = {
    id: "id",
    description: "description",
    owner: "owner",
    url: "url",
    title: "title",
  };
  return addDocument;
};

class AddDocumentController {
  constructor(addDocumentUseCase) {
    this.addDocumentUseCase = addDocumentUseCase;
  }
  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }
      const requiredParams = ["description", "owner", "url", "title"];

      for (const param of requiredParams) {
        if (!httpRequest[param]) {
          return HttpResponse.badRequest(new MissingParamError(param));
        }
      }
      const document = await this.addDocumentUseCase.execute(httpRequest);
      return HttpResponse.created(document);
    } catch (error) {
      return HttpResponse.InternalError();
    }
  }
}

const makeSut = () => {
  const addDocumentUseCase = makeAddDocumentUseCase();
  const sut = new AddDocumentController(addDocumentUseCase);
  return {
    addDocumentUseCase,
    sut,
  };
};

describe("Add Document Controller", () => {
  const httpRequest = {
    description: "This is a fake document",
    owner: "John Doe",
    url: "https://www.youtube.com/watch?v=qa-4_A2uIOU",
    title: "Fake Document",
  };
  test("should return 201 if httpRequest is provided", async () => {
    const { sut, addDocumentUseCase } = makeSut();
    const request = await sut.handle(httpRequest);
    expect(request.body).toEqual(addDocumentUseCase.data);
    expect(request.statusCode).toEqual(201);
  });

  test("should return 500 if no httpRequest is provided", async () => {
    const { sut } = makeSut();
    const request = await sut.handle();
    expect(request.statusCode).toEqual(500);
  });

  test("should return 400 if param description are missing", async () => {
    const { sut } = makeSut();
    const httpParams = {
      //   description: "This is a fake document", no description
      owner: "John Doe",
      url: "https://www.youtube.com/watch?v=qa-4_A2uIOU",
      title: "Fake Document",
    };

    const request = await sut.handle({});
    expect(request.statusCode).toEqual(400);
    expect(request.body.error).toBe("Missing param: description");
  });

  test("should return 400 if param owner are missing", async () => {
    const { sut } = makeSut();
    const httpParams = {
      description: "This is a fake document",
      //   owner: "John Doe", no owner
      url: "https://www.youtube.com/watch?v=qa-4_A2uIOU",
      title: "Fake Document",
    };

    const request = await sut.handle(httpParams);
    expect(request.statusCode).toEqual(400);
    expect(request.body.error).toBe("Missing param: owner");
  });

  test("should return 400 if param url are missing", async () => {
    const { sut } = makeSut();
    const httpParams = {
      description: "This is a fake document",
      owner: "John Doe",
      //   url: "https://www.youtube.com/watch?v=qa-4_A2uIOU",
      title: "Fake Document",
    };

    const request = await sut.handle(httpParams);
    expect(request.statusCode).toEqual(400);
    expect(request.body.error).toBe("Missing param: url");
  });

  test("should return 400 if param title are missing", async () => {
    const { sut } = makeSut();
    const httpParams = {
      description: "This is a fake document",
      owner: "John Doe",
      url: "https://www.youtube.com/watch?v=qa-4_A2uIOU",
      //   title: "Fake Document",
    };

    const request = await sut.handle(httpParams);
    expect(request.statusCode).toEqual(400);
    expect(request.body.error).toBe("Missing param: title");
  });

  test("should return 500 if error occurs", async () => {
    const usecase = {
      execute: jest.fn().mockRejectedValue(new Error("some error in controller"))
    };
    const sut = new AddDocumentController(usecase)
    const request = await sut.handle(httpRequest);
    expect(request.statusCode).toEqual(500);
    console.log(request.body)
    expect(request).toEqual(HttpResponse.InternalError());
  });
  
});
