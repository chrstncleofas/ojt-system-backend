export interface INotifForAdmin {
  student: string;
  nameOfStudent: string;
  message: string;
  is_read?: boolean;
  document_name: string;
  created_at: Date;
}
