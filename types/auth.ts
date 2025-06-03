export interface UserCustomer {
  userName: string;
  email: string;
  password: string;
  bsd: string;
  fullName?: string;
  imageBase64?: string | null;
  phoneNumber: string;
  apartmentNumber?: string | null;
  buildingNumber?: string | null;
  cityId: number;
  street: string;
  postalCode?: string | null;
}

