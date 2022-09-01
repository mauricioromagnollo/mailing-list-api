import { UseCase } from '@/usecases/ports';

export class ErrorThrowUseCaseStub implements UseCase {
  perform(): Promise<any> {
    throw Error();
  }
}
