import { ApiService } from '@services/ApiService';
import { IAdmin } from '@interfaces/IAdmin';

interface IAllPayload {
  limit: number;
  page: number;
}

interface IAllResponse {
  admins: IAdmin[];
  meta: {
    count: number;
    limit: number;
    skip: number;
    page: number;
  };
}
export class AdminService {
  async all({ limit, page }: IAllPayload): Promise<IAllResponse> {
    const apiService = new ApiService<IAllResponse>();

    return apiService.get({
      endpoint: `/admins?page=${page}&limit=${limit}`,
    });
  }
}
