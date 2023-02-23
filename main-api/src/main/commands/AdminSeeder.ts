import { AdminEntity } from "@entities/AdminEntity";
import { AdminsRepository } from "@repositories/implementations/AdminsRepository";

export async function execute() {
  const adminsRepository = new AdminsRepository();

  const admin = await adminsRepository.create(
    new AdminEntity({
      name: "Bruno Tardivo",
      email: "brn.tardivo@gmail.com",
      password: "123456",
    })
  );

  if (!admin) {
    throw new Error("A error has occurred on insert an admin on database.");
  }

  return "Admin inserted!";
}
