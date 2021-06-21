export type Stages = 'Employee' | 'Direct Supervisor' | 'Department Head' | 'Benefits Coordinator' | 'Approved' | 'Done';

export default class Reimbursment {
  constructor(
      public id: number,
      public employee: string,
      public stage: Stages,
      public nextStage: Stages,
      public amount: number,
      public date: number,
      public gradeFormat: string,
      public grade: string,
      public location: string,
      public description: string,
  ) {}
}
