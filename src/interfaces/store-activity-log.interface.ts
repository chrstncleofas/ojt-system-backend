export interface IStoreActivityLog {
  user: string;
  first_name?: string;
  last_name?: string;
  position?: string;
  action: string;
  timestamp: Date;
  description?: string;
  ip_address?: string;
}
