import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { HttpResponse } from "../../helpers/httpReponse.js";
import { AddWorkSpaceController } from "../workspace/add-workspace-controller.js";

class CreateNewCaseUseCase {
  async execute(data) {
    return this.caseData; // Update this line with the actual implementation of the use case
  }
}

class CreateNewCaseUseCaseController {
  constructor(createNewCaseUseCase) {
    this.createNewCaseUseCase = createNewCaseUseCase;
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }

      const requiredFields = [
        "title",
        "customer",
        "action_type",
        "awarded_amount",
        "involved_parties",
        "status",
        "owner",
        "protocol",
        "casedata",
        "history",
      ];

      for (const field of requiredFields) {
        if (!httpRequest[field]) {
          return HttpResponse.badRequest(new MissingParamError(field));
        }
      }

      const newCase = await this.createNewCaseUseCase.execute(httpRequest);
      if (newCase) return HttpResponse.ok(newCase);
    } catch (error) {
      return HttpResponse.InternalError();
    }
  }
}

const makeSut = () => {
  const createNewCaseUseCase = new CreateNewCaseUseCase(); // Instantiate the CreateNewCaseUseCase
  const sut = new CreateNewCaseUseCaseController(createNewCaseUseCase);
  return {
    sut,
    createNewCaseUseCase
  };
};

describe("CreateNewCaseUseCaseController", () => {
  test("should return InternalError response if httpRequest is not provided", async () => {
    const { sut } = makeSut();
    const response = await sut.handle(null);

    expect(response).toEqual(HttpResponse.InternalError());
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


    const { sut, createNewCaseUseCase } = makeSut();
    createNewCaseUseCase.caseData = httpRequest;
    const request = await sut.handle(httpRequest)
    expect(request.body).toEqual(createNewCaseUseCase.caseData);
  });
});
