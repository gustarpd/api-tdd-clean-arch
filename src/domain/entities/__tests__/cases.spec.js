import { Case } from "../cases.js";

describe("Case", () => {
  const caseData = {
    title: "Título do caso",
    customer: "Nome do cliente",
    status: "Em andamento",
    owner: "Nome do responsável",
    protocol: "Número do protocolo",
    casedata: [
      {
        lawsuitValue: 134.0,
        convictionValue: 110.9,
        createdAt: "any",
      },
    ],
    history: [
      {
        description: "Histórico manual",
        owner: "Responsável por adicionar o histórico ao caso",
        date: "22-02-2001",
      },
    ],
  };

  test("should create Case object with correct properties", () => {
    const caseInstance = Case.create(caseData);

    expect(caseInstance.title).toBe(caseData.title);
    expect(caseInstance.customer).toBe(caseData.customer);
    expect(caseInstance.status).toBe(caseData.status);
    expect(caseInstance.owner).toBe(caseData.owner);
    expect(caseInstance.protocol).toBe(caseData.protocol);
    expect(caseInstance.casesData).toEqual(caseData.casedata);
    expect(caseInstance.history).toEqual(caseData.history);
  });
});
