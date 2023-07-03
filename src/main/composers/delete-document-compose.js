import { DeleteDocumentUseCase } from "../../domain/usecases/documents/delete-document-usecase.js";
import { DeleteDocumentController } from "../../presentation/controllers/documents/delete-document-controller.js";
import { DeleteDocumentRepository } from "../../infra/repositories/delete-document-repository.js";

export class DeleteDocumentCompose {
  static compose() {
    const makeDeleteDocumentRespository = new DeleteDocumentRepository();
    const makeDeleteDocumentUseCase = new DeleteDocumentUseCase(
      makeDeleteDocumentRespository
    );
    return new DeleteDocumentController(makeDeleteDocumentUseCase);
  }
}
