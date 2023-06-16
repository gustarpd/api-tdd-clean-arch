import { GetAllTasksRepository } from "../get-all-tasks-repository";
import { WorkSpace } from "../../db/schemas/Workspace";

describe("GetAllTasksRepository", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("deve retornar uma lista vazia quando nenhum documento for encontrado", async () => {

    jest.spyOn(WorkSpace, "find").mockResolvedValue([]);

    const repository = new GetAllTasksRepository();
    const result = await repository.findAll();

    expect(result).toEqual([]);
  });

  test("deve retornar uma lista de documentos quando encontrados", async () => {
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

  test("deve lançar um erro quando ocorrer um erro na consulta", async () => {
    const errorMock = new Error("Erro na consulta");
    jest.spyOn(WorkSpace, "find").mockRejectedValue(errorMock);
    const repository = new GetAllTasksRepository();
    await expect(repository.findAll()).rejects.toThrow(errorMock);
  });
});
