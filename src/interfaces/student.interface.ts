export interface IStudent {
  userRef: string;
  studentId: string;
  firstname: string;
  middlename?: string;
  lastname: string;
  prefix?: string;
  email: string;
  address?: string;
  number?: string;
  course?: string;
  year?: string;
  image?: string;
  nameOfSupervisor?: string;
  hteAddress?: string;
  contactNumber?: string;
  department?: string;
  username: string;
  password: string;
  status?: string;
  archivedStudents?: string;
  resetToken?: string;
}
