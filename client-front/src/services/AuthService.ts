import { ApiService } from '@services/ApiService';
import { IUser } from '@interfaces/IUser';

interface IFetchSignInPayload {
  email: string;
  password: string;
}

interface IFetchSignInResponse {
  _id: string;
  user: IUser;
  token: string;
}

export class AuthService {
  async fetchSignIn({ email, password }: IFetchSignInPayload): Promise<IFetchSignInResponse> {
    const apiService = new ApiService<IFetchSignInResponse>();

    return apiService.post({
      endpoint: '/auth/sign-in',
      params: { email, password },
    });
  }
}
