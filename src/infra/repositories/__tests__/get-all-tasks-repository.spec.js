import { GetAllTasksRepository } from "../get-all-tasks-repository";
import { WorkSpace } from "../../db/schemas/Workspace";

describe("GetAllTasksRepository", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return an empty list when no documents are found", async () => {

    jest.spyOn(WorkSpace, "find").mockResolvedValue([]);

    const repository = new GetAllTasksRepository();
    const result = await repository.findAll();

    expect(result).toEqual([]);
  });

  test("should return a list of documents when found", async () => {
    const documentsMock = [
      { id: 1, title: "Tarefa 1" },
      { id: 2, title: "Tarefa 2" },
      { id: 3, title: "Tarefa 3" },
    ];
    jest.spyOn(WorkSpace, "find").mockResolvedValue(documentsMock);
    const repository = new GetAllTasksRepository();
    const result = await repository.findAll();
    expect(result).toEqual(documentsMock);
  });

  test("should throw an error when an error occurs in the query", async () => {
    const errorMock = new Error("Erro na consulta");
    jest.spyOn(WorkSpace, "find").mockRejectedValue(errorMock);
    const repository = new GetAllTasksRepository();
    await expect(repository.findAll()).rejects.toThrow(errorMock);
  });
});
