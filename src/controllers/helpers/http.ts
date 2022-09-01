import { HttpResponse } from '@/controllers/ports';

export const HTTP_STATUS_CODE = {
  CREATED: 201,
};

export const created = (data: any): HttpResponse => ({
  statusCode: HTTP_STATUS_CODE.CREATED,
  body: data,
});
