export default class User {
  constructor(
    public userName: string,
    public password: string,
    public role: 'Employee' | 'Direct Supervisor' | 'Department Head' | 'Benefits Coordinator',
    public reimbursment: number = 1000,
  ) {}
}
