﻿export interface PigFarmVectorControl {
  id: number;
  farmGuid: string;
  makeOrderGuid: string;
  pigType: string;
  type: string;
  upperGuid: string;
  estDate: string | null;
  estTime: string;
  recordDate: any | null;
  recordTime: string;
  vectorControlGuid: string;
  useType: string;
  useUnit: string;
  capacity: string;
  frequency: string;
  applyDays: string;
  comment: string;
  createDate: string | null;
  createBy: number | null;
  updateDate: string | null;
  updateBy: number | null;
  deleteDate: string | null;
  deleteBy: number | null;
  status: number | null;
  guid: string;
  pigGuid: string;
  penGuid: string;
  typeName: string;
  useTypeName: string;
  useUnitName: string;
  capacityName: string;
  frequencyName: string;
  applyDaysName: string;
  vectorControlName: string;
  roomGuid: string;

}
