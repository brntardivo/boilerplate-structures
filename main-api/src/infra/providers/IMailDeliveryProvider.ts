interface IAddress {
  email: string;
  name: string;
}

export interface IMail {
  to: IAddress;
  subject: string;
  body: {
    name?: string;
    token?: string;
    url?: string;
  };
}

export interface IMailDeliveryProvider {
  sendMail(mail: IMail): Promise<void>;
}
