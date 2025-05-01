interface AddressDto {
    street?: string;
    buildingNumber?: string;
    apartmentNumber?: string;
    postalCode?: string;
    city?: string; 
    governorate?: string;
}

export interface UserCustomer {
    userName?: string;
    email?: string;
    password?: string;
    bsd: string; 
    fullName?: string;
    imageBase64?: string;
    phoneNumber?: string;
    apartmentNumber: string;
    buildingNumber: string;
    cityId: number;
    street: string;
    postalCode: number;
}

