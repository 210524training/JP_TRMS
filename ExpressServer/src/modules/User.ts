export type Roles = 'Employee' | 'Direct Supervisor' | 'Department Head' | 'Benefits Coordinator';

export default class User {
  constructor(
    public userName: string,
    public password: string,
    public role: Roles,
    public reimbursment: number = 1000,
  ) {}
}
