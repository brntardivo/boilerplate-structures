export interface ICustomError extends Error {
  statusCode: number;
  message: string;
  throw(): void;
}

export class badRequest extends Error implements ICustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, badRequest.prototype);
  }

  throw() {
    throw this;
  }
}

export class notFound extends Error implements ICustomError {
  statusCode = 404;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, notFound.prototype);
  }

  throw() {
    throw this;
  }
}

export class internalError extends Error implements ICustomError {
  statusCode = 500;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, internalError.prototype);
  }

  throw() {
    throw this;
  }
}

export class unprocessableEntity extends Error implements ICustomError {
  statusCode = 422;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, unprocessableEntity.prototype);
  }

  throw() {
    throw this;
  }
}

export class unauthorized extends Error implements ICustomError {
  statusCode = 401;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, unauthorized.prototype);
  }

  throw() {
    throw this;
  }
}
