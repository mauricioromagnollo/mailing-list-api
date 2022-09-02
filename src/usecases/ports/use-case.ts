export interface UseCase {
  perform <T = any>(T?: T): Promise<T>;
}
