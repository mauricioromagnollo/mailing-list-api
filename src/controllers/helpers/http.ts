import { HttpResponse } from '@/controllers/ports';

export const HTTP_STATUS_CODE = {
  CREATED: 201,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

export const created = <T = any> (data: T): HttpResponse => ({
  statusCode: HTTP_STATUS_CODE.CREATED,
  body: data,
});

export const badRequest = <T = any> (data: T): HttpResponse => ({
  statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
  body: data,
});

export const internalServerError = <T = any> (data: T): HttpResponse => ({
  statusCode: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
  body: data,
});
