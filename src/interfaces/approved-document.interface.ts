export interface IApprovedDocument {
  nameOfDocs: string;
  student: string;
  approved_file: string;
  approved_date: Date;
  score?: number;
}
