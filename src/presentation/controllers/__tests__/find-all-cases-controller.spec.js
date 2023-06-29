import { HttpResponse } from "../../helpers/httpReponse";
import { FindAllCustomerController } from "../customers/get-all-customers-controller";

const makeFindAllCaseUseCase = () => {
  class FindAllCasesUseCase {
    async find() {
      this.data;
      if (!this.data) {
        return { message: "Nenhum caso/processo foi encontrado." };
      }
      return HttpResponse.ok(this.data);
    }
  }

  const findAllCaseUseCase = new FindAllCasesUseCase();
  findAllCaseUseCase.data = {
    _id: "649cba113064d35fdf80d6ac",
    title: "edited",
    customer: "John Doe",
    awarded_amount: 5000,
    involved_parties: [],
    status: "Pending",
    owner: "Jane Smith",
    protocol: "ABC123",
    casedata: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    event: [
      {
        title: "First Event",
        owner: "Event Owner 1",
        start_date: "2023-07-01T00:00:00.000Z",
        end_date: "2023-07-05T00:00:00.000Z",
        createdAt: "2023-06-28T08:00:00.000Z",
        _id: "649cba113064d35fdf80d6ae",
      },
      {
        title: "Second Event",
        owner: "Event Owner 2",
        start_date: "2023-07-10T00:00:00.000Z",
        end_date: "2023-07-15T00:00:00.000Z",
        createdAt: "2023-06-29T10:30:00.000Z",
        _id: "649cba113064d35fdf80d6af",
      },
    ],
    __v: 0,
  };
  return findAllCaseUseCase;
};

const makeSut = () => {
  const findAllUseCase = makeFindAllCaseUseCase();
  const sut = new FindAllCasesController(findAllUseCase);
  return {
    sut,
    findAllUseCase,
  };
};

describe("FindAllCases controller", () => {
  test("should return HttpRequest if request succeeds", async () => {
    const { sut, findAllUseCase } = makeSut();
    expect((await sut.handle({})).statusCode).toBe(200);
    expect((await sut.handle({})).body).toEqual(
      findAllUseCase.data
    );
  });

  test("should return message if cases are not found", async () => {
    const useCase = {
      find() {
        return Promise.resolve({
          message: "Nenhum caso/processo foi encontrado.",
        });
      },
    };
    const sut = new FindAllCustomerController(useCase);
    console.log(await sut.handle({}));
  });

  test("should return an internal error response when an error occurs'", async () => {
    const useCase = new FindAllCustomerController();
    const response = await useCase.handle();
    expect(response.statusCode).toBe(500);
  });

  test("should return an internal server error response if an error occurs", async () => {
    const findCaseUseCaseSpy = {
      find: jest.fn().mockRejectedValueOnce(HttpResponse.InternalError()),
    };
    const sut = new FindAllCustomerController(findCaseUseCaseSpy);

    const httpRequest = {
      // httpRequest object
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponse.InternalError());
  });
});
