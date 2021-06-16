export default class Reimbursment {
  constructor(
      public id: number,
      public employee: string,
      public stage: 'Employee' | 'Direct Supervisor' | 'Department Head' | 'Benefits Coordinator' | 'Done',
      public nextStage: 'Direct Supervisor' | 'Department Head' | 'Benefits Coordinator' | 'Done',
      public amount: number,
      public date: number,
      public gradeFormat: string,
      public grade: string,
      public location: string,
      public description: string,
  ) {}
}
