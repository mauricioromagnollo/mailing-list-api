export interface UseCase {
  perform (T?: any): Promise<any>;
}
