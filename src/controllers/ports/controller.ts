import { HttpRequest, HttpResponse } from '@/controllers/ports';

export interface Controller {
  handle (request: HttpRequest): Promise<HttpResponse>;
}
