import { connect, disconnect } from '../../helper/mongo-in-memory-server'
import { WorkSpace } from '../../db/schemas/Workspace'

describe('Testes de exclusão de documento', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect()
  });

  test('Should delete By Id', async () => {
    const newDocument = new WorkSpace({
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority"
    });
    const savedDocument = await newDocument.save();
    const deletedDocument = await newDocument.deleteOne(savedDocument._id);
    expect(deletedDocument).toEqual(savedDocument);
  });
});