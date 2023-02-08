import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { isEmpty } from 'lodash';

interface IDynamicObject {
  [key: string]: string;
}

interface IGenericMethod {
  endpoint: string;
  params?: IDynamicObject;
  forceToken?: string | null;
  sendBearerToken?: boolean;
  encoded?: boolean;
  token?: string | null;
}

export interface IApiService<T> {
  setupHeaders(
    multipart: boolean,
    forceToken?: string | null,
    sendBearerToken?: boolean,
    encoded?: boolean
  ): IDynamicObject;
  makeEncodedParams(params?: IDynamicObject): string;
  makeItMultipartParams(params?: IDynamicObject): FormData;
  post(props: IGenericMethod): Promise<T>;
  postEncoded(props: IGenericMethod): Promise<T>;
  postMultipart(props: IGenericMethod): Promise<T>;
  get(props: IGenericMethod): Promise<T>;
  put(props: IGenericMethod): Promise<T>;
  putMultipart(props: IGenericMethod): Promise<T>;
  del(props: IGenericMethod): Promise<T>;
}

export class ApiService<T> implements IApiService<T> {
  token?: string | null;
  fetch: AxiosInstance;

  constructor(token: string | null = null) {
    this.token = token;
    this.fetch = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  setupHeaders(
    multipart = false,
    forceToken: string | null = null,
    sendBearerToken = true,
    encoded = false
  ): IDynamicObject {
    const headers: IDynamicObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (multipart) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    if (this.token && sendBearerToken) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (forceToken && sendBearerToken) {
      headers['Authorization'] = `Bearer ${forceToken}`;
    }

    if (encoded) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    return headers;
  }

  makeEncodedParams(params?: IDynamicObject): string {
    const formBody = [];

    for (const property in params) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&');
  }

  makeItMultipartParams(params?: IDynamicObject) {
    const p = new FormData();

    if (isEmpty(params)) {
      return p;
    }

    Object.keys(params).forEach(function (key) {
      if (Array.isArray(params[key])) {
        for (const r of params[key]) {
          p.append(`${key}[]`, r);
        }
      } else {
        p.append(key, params[key]);
      }
    });

    return p;
  }

  postEncoded({
    endpoint,
    params,
    forceToken = null,
    sendBearerToken = true,
  }: IGenericMethod): Promise<T> {
    return this.fetch
      .post(endpoint, this.makeEncodedParams(params), {
        headers: this.setupHeaders(true, forceToken, sendBearerToken, true),
      })
      .then((res) => {
        if (![200, 201, 401].includes(res.status)) {
          console.log(res.data?.message);
        }
        return res.data;
      })
      .catch((error) => {
        let message = 'Undefined error';
        if (error.response) {
          message = error.response.message;
        }

        console.log(message);

        throw error;
      });
  }

  postMultipart({ endpoint, params }: IGenericMethod): Promise<T> {
    return this.fetch
      .post(endpoint, this.makeItMultipartParams(params), {
        headers: this.setupHeaders(true),
      })
      .then((res) => {
        if (![200, 201, 401].includes(res.status)) {
          console.log(res.data?.message);
        }
        return res.data;
      })
      .catch((error) => {
        let message = 'Undefined error';
        if (error.response) {
          message = error.response.message;
        }

        if (error?.response?.status !== 401) {
          console.log(message);
        }

        throw error;
      });
  }

  post({
    endpoint,
    params,
    forceToken = null,
    sendBearerToken = true,
    encoded = false,
  }: IGenericMethod): Promise<T> {
    return this.fetch
      .post(endpoint, params, {
        headers: this.setupHeaders(false, forceToken, sendBearerToken, encoded),
      })
      .then((res) => {
        if (![200, 201, 401].includes(res.status)) {
          console.log(res.data?.message);
        }
        return res.data;
      })
      .catch((error) => {
        let message = 'Undefined error';
        if (error.response) {
          message = error.response.message;
        }

        if (error?.response?.status !== 401) {
          console.log(message);
        }

        throw error;
      });
  }

  get({ endpoint, token = null, sendBearerToken = true }: IGenericMethod): Promise<T> {
    return this.fetch
      .get(endpoint, {
        headers: this.setupHeaders(false, token, sendBearerToken),
      })
      .then((res) => {
        if (![200, 201, 401].includes(res.status)) {
          console.log(res.data?.message);
        }
        return res.data;
      })
      .catch((error) => {
        let message = 'Undefined error';
        if (error.response) {
          message = error.response.message;
        }

        if (error?.response?.status !== 401) {
          console.log(message);
        }

        throw error;
      });
  }

  putMultipart({ endpoint, params }: IGenericMethod): Promise<T> {
    return this.fetch
      .put(endpoint, this.makeItMultipartParams(params), {
        headers: this.setupHeaders(true),
      })
      .then((res) => res.data)
      .catch((error) => {
        let message = 'Undefined error';
        if (error.response) {
          message = error.response.message;
        }

        if (error?.response?.status !== 401) {
          console.log(message);
        }

        throw error;
      });
  }

  put({ endpoint, params, forceToken = null, sendBearerToken = true }: IGenericMethod): Promise<T> {
    return this.fetch
      .put(endpoint, params, {
        headers: this.setupHeaders(false, forceToken, sendBearerToken),
      })
      .then((res) => {
        if (![200, 201, 401].includes(res.status)) {
          console.log(res.data?.message);
        }
        return res.data;
      })
      .catch((error) => {
        let message = 'Undefined error';
        if (error.response) {
          message = error.response.message;
        }

        if (error?.response?.status !== 401) {
          console.log(message);
        }

        throw error;
      });
  }

  del({ endpoint, forceToken = null, sendBearerToken = true }: IGenericMethod): Promise<T> {
    return this.fetch
      .delete(endpoint, {
        headers: this.setupHeaders(false, forceToken, sendBearerToken),
      })
      .then((res) => res.data)
      .catch((error) => {
        let message = 'Undefined error';
        if (error.response) {
          message = error.response.message;
        }

        if (error?.response?.status !== 401) {
          console.log(message);
        }

        throw error;
      });
  }

  getExternal(url: string, headers: IDynamicObject = {}): Promise<T> {
    return axios
      .get(url, {
        headers,
      })
      .then((res) => res.data)
      .catch((error) => {
        console.log(error.response?.message);
        throw error;
      });
  }

  postExternal(url: string, headers: AxiosRequestHeaders, body: BodyInit): Promise<T> {
    return axios
      .post(url, body, {
        headers,
      })
      .then((res) => res.data)
      .catch((error) => {
        console.log(error.response.message);
        throw error;
      });
  }
}
