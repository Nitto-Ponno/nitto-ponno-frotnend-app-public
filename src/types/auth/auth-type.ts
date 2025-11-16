export interface TName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface TAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface TUser {
  _id: string;
  password: string;
  isActive?: boolean;
  role: 'customer' | string;
  isVerified?: boolean;
  userType: 'customer' | 'admin';
  isMasterAdmin?: boolean;
  phoneNumber: string;
  otp: string;
  passwordChangedAt?: string;
  name: TName;
  email: string;
  address?: TAddress;
  profilePicture?: string;
  isDeleted?: boolean;
}

export type TSignupUser = {
  email: string;
  password: string;
  phoneNumber: string;
  name: string;
};
