import { GetDocumentsUseCase } from "../../domain/usecases/documents/get-all-documents-usecase.js";
import { GetAllDocumentsRepository } from "../../infra/repositories/get-all-document-repository.js";
import { GetAllDocumentsController } from "../../presentation/controllers/documents/get-all-documents-controller.js";

export class GetAllDocumentCompose {
  static compose() {
    const getAllDocumentsRepository = new GetAllDocumentsRepository();
    const getAllDocumentUseCase = new GetDocumentsUseCase(
      getAllDocumentsRepository
    );
    return new GetAllDocumentsController(getAllDocumentUseCase);
  }
}
