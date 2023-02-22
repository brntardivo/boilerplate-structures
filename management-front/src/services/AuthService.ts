import { ApiService } from '@services/ApiService';
import { IAdmin } from '@interfaces/IAdmin';

interface ISignInPayload {
  email: string;
  password: string;
}

interface ISignInResponse {
  _id: string;
  user: IAdmin;
  token: string;
}

interface IStartRecoveryPasswordProcessPayload {
  email: string;
}

interface IStartRecoveryPasswordProcessResponse {
  response: boolean;
}

interface ISignUpPayload {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

interface ISignUpResponse {
  response: boolean;
}
export class AuthService {
  async signIn({ email, password }: ISignInPayload): Promise<ISignInResponse> {
    const apiService = new ApiService<ISignInResponse>();

    return apiService.post({
      endpoint: '/auth/sign-in',
      params: { email, password },
    });
  }

  async startRecoveryPasswordProcess({
    email,
  }: IStartRecoveryPasswordProcessPayload): Promise<IStartRecoveryPasswordProcessResponse> {
    const apiService = new ApiService<IStartRecoveryPasswordProcessResponse>();

    return apiService.post({
      endpoint: '/auth/password-recovery',
      params: { email },
    });
  }

  async signUp({
    email,
    name,
    password,
    passwordConfirmation,
  }: ISignUpPayload): Promise<ISignUpResponse> {
    const apiService = new ApiService<ISignUpResponse>();

    return apiService.post({
      endpoint: '/auth/sign-up',
      params: { email, name, password, passwordConfirmation },
    });
  }
}
