import { IAllAdminsDTO } from "@domain/management/allAdmins/IAllAdminsDTO";
export class AllAdminsUseCase {
  constructor() {
    //
  }
  async execute(data: IAllAdminsDTO): Promise<object> {
    const { limit = 10, page = 1 } = data;

    const count = 0;

    return {
      admins: [],
      meta: {
        count,
        limit,
        skip: 0,
        page,
      },
    };
  }
}
