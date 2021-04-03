export enum SocialLoginTypeEnum {
  GOOGLE = 'Google',
  METAMASK = 'Metamask',
  EMAIL_PASSWORD = 'email_password',
}
export enum UserType {
  COMPANY,
  CERTIFICATE_AUTHORITY,
}
export enum CompanyEntityTypeEnum {
  MANUFACTURER = '0',
  LOGISTIC = '1',
  WAREHOUSE = '2',
  RETAILER = '3',
}
export enum EntityTypeEnum {
  COMPANY = '0',
  CERTIFICATE_AUTHORITY = '1',
}
export enum TransportStatusEnum {
  NONE,
  READY_FOR_TRANSIT,
  PENDING_TRANSIT,
  IN_TRANSIT,
  PENDING_FINALISED,
  FINALISED,
}
export enum CertificateTypeEnum {
  ENVIRONMENTAL_IMPACT,
  SAFETY_AND_QUALITY,
  HEALTH_AND_NUTRITION,
  SOCIAL_IMPACT,
  ANIMAL_WELFARE,
  OTHER,
}
