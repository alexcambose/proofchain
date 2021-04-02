import { CompanyEntityTypeEnum, EntityTypeEnum } from '@enums';

export interface IUserData {
  name?: string;
  email?: string;
  accessToken?: string;
  profileImage?: string;
  address?: string;
  hasEntity: boolean;
  companyEntityType: CompanyEntityTypeEnum;
  entityType: EntityTypeEnum;
  balance?: string;
  loadingBalance?: boolean;
  lastBalanceRefresh?: number;
}
export interface IUser extends IUserData {
  loggedIn?: boolean;
}
