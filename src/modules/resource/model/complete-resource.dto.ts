export class CompleteResourceDto {
  ENName: string;
  rank: number;
  uuid: string;
  createdAt: string;
  lastModifiedAt: string;
  type: string;
  status: string;
  FRName: string;

  constructor(
    ENName: string,
    rank: number,
    uuid: string,
    createdAt: string,
    lastModifiedAt: string,
    type: string,
    status: string,
    FRName: string,
  ) {
    this.ENName = ENName;
    this.rank = rank;
    this.uuid = uuid;
    this.createdAt = createdAt;
    this.lastModifiedAt = lastModifiedAt;
    this.type = type;
    this.status = status;
    this.FRName = FRName;
  }
}