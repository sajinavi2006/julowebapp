export type ApplicationStatus = 'approved' | 'rejected' | 'processed';

export interface ApplicationInfo {
  customer: string;
  applicationStatus: ApplicationStatus;
  creditLimit: number | null;
}
