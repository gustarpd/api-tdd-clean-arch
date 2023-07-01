import { AddDocumentUseCase } from '../../domain/usecases/documents/create-document-usecase.js'
import { AddDocumentController } from '../../presentation/controllers/documents/add-document-controller.js'
import { AddDocumentRepository } from '../../infra/repositories/add-document-repository.js'

export class AddDocumentCompose {
  static compose() {
    const addDocumentRepository = new AddDocumentRepository()
    const addDocumentUseCase = new AddDocumentUseCase(addDocumentRepository)
    return new AddDocumentController(addDocumentUseCase)
  }
}
