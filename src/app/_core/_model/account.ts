export interface Account {
  id: number;
  name: string;
  no: string;
  rfid: string;
  username: string;
  password: string;
  accountRole: string;
  licensePath: string;
  photoPath: string;
  comment: string;
  startDate: string | null;
  endDate: string | null;
  lastLogin: string | null;
  lastUse: string | null;
  pigAppLoginErrorTimes: number;
  equipmentAppLoginErrorTimes: number;
  webLoginErrorTimes: number;
  pigAppLockedAt: string | null;
  equipmentAppLockedAt: string | null;
  accountTypeID: number | null;
  accountGroupID: number | null;
  ocid: number | null;
  ocidList: any;
  employeeID: number | null;
  guid: string;
  file: any;
}

export interface UploadAvatarRequest {
  file: any;
  id: number;
}
export interface XAccountDto {
  accountId: number;
  clinicId: number | null;
  uid: string;
  upwd: string;
  accountNo: string;
  accountName: string;
  accountSex: string;
  accountBirthday: string | null;
  accountNickname: string;
  accountTel: string;
  accountMobile: string;
  accountAddress: string;
  accountIdcard: string;
  accountEmail: string;
  startDate: string | null;
  endDate: string | null;
  lastlogin: string | null;
  lastuse: string | null;
  comment: string;
  status: string;
  token: string;
  cancelFlag: string;
  createBy: number | null;
  createDate: string | null;
  updateBy: number | null;
  updateDate: string | null;
  pAdmin: string;
  pAccount: string;
  pPatient: string;
  pRequisitionConfirm: string;
  pPhotoComment: string;
  lastLoginDate: string | null;
  pClinic: string;
  pCodeType: string;
  pEnquiry: string;
  pEnquiryResult: string;
  guid: string;
  roleId: number | null;
  typeId: number | null;
  farmGuid: string;
  accountRole: string;
  accountType: string;
  accountGroup: string;
  accountOrganization: number | null;
  accountSite: number | null;
  errorLogin: number | null;
  photoPath: string;
  accountDomicileAddress: string;
  file: any;
}
