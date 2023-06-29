import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { HttpResponse } from "../../helpers/httpReponse.js";
import { CreateNewCaseController } from "../cases/create-new-case-controller.js";

class CreateNewCaseUseCase {
  async execute(data) {
    return this.caseData; // Update this line with the actual implementation of the use case
  }
}

const makeSut = () => {
  const createNewCaseUseCase = new CreateNewCaseUseCase(); // Instantiate the CreateNewCaseUseCase
  const sut = new CreateNewCaseController(createNewCaseUseCase);
  return {
    sut,
    createNewCaseUseCase,
  };
};

describe("CreateNewCaseUseCaseController", () => {
  test("should return InternalError response if httpRequest is not provided", async () => {
    const createCustomerUseCaseSpy = {
      execute: jest.fn().mockImplementation(() => {
        throw new Error("Some error occurred");
      }),
    };
    const httpRequest = {
      title: "Sample Case",
      customer: "John Doe",
      action_type: "Civil",
      awarded_amount: 5000,
      involved_parties: [{
        name: "John Doe",
      }],
      status: "Pending",
      owner: "Jane Smith",
      protocol: "ABC123",
      casedata: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      event: [
        {
          titulo: "First Event",
          valor_causa: 1000,
          valor_condenacao: 500,
          data_criada: "2023-06-01",
        },
        {
          titulo: "Second Event",
          valor_causa: 2000,
          valor_condenacao: 1500,
          data_criada: "2023-06-15",
        },
      ],
    };
    const sut = new CreateNewCaseController(createCustomerUseCaseSpy);

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(HttpResponse.InternalError());
  });
  
  test("should return InternalError response if httpRequest is not provided", async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(HttpResponse.InternalError());
  });

  test("should return BadRequest response if required fields are missing", async () => {
    const { sut, createNewCaseUseCase } = makeSut();
    const httpRequest = {
      title: "Sample Case",
      customer: "John Doe",
      // action_type: "Civil",
      awarded_amount: 5000,
      involved_parties: ["Party A", "Party B"],
      status: "Pending",
      owner: "Jane Smith",
      protocol: "ABC123",
      casedata: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      history: [
        {
          titulo: "First Event",
          valor_causa: 1000,
          valor_condenacao: 500,
          data_criada: "2023-06-01",
        },
        {
          titulo: "Second Event",
          valor_causa: 2000,
          valor_condenacao: 1500,
          data_criada: "2023-06-15",
        },
      ],
    };
    // createNewCaseUseCase.caseData = httpRequest;
    const response = await sut.handle(httpRequest);

    expect(response).toEqual(
      HttpResponse.badRequest(new MissingParamError("action_type"))
    );
  });

  test("should return ok response with the created case", async () => {
    const httpRequest = {
      title: "Sample Case",
      customer: "John Doe",
      action_type: "Civil",
      awarded_amount: 5000,
      involved_parties: ["Party A", "Party B"],
      status: "Pending",
      owner: "Jane Smith",
      protocol: "ABC123",
      casedata: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      event: [
        {
          titulo: "First Event",
          valor_causa: 1000,
          valor_condenacao: 500,
          data_criada: "2023-06-01",
        },
        {
          titulo: "Second Event",
          valor_causa: 2000,
          valor_condenacao: 1500,
          data_criada: "2023-06-15",
        },
      ],
    };

    const { sut, createNewCaseUseCase } = makeSut();
    createNewCaseUseCase.caseData = httpRequest;
    const request = await sut.handle(httpRequest);
    expect(request.body).toEqual(createNewCaseUseCase.caseData);
  });
});
