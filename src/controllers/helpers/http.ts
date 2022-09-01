import { HttpResponse } from '@/controllers/ports';

export const HTTP_STATUS_CODE = {
  CREATED: 201,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

export const created = (data: any): HttpResponse => ({
  statusCode: HTTP_STATUS_CODE.CREATED,
  body: data,
});

export const badRequest = (data: any): HttpResponse => ({
  statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
  body: data,
});

export const internalServerError = (data: any): HttpResponse => ({
  statusCode: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
  body: data,
});
