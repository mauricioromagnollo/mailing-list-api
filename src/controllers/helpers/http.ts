import { HttpResponse } from '@/controllers/ports';

export const HTTP_STATUS_CODE = {
  CREATED: 201,
  BAD_REQUEST: 400,
};

export const created = (data: any): HttpResponse => ({
  statusCode: HTTP_STATUS_CODE.CREATED,
  body: data,
});

export const badRequest = (data: any): HttpResponse => ({
  statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
  body: data,
});
