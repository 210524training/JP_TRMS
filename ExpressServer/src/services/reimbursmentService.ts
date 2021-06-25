import userRepo from '../repos/reimbursmentRepo';
import Reimbursment from '../modules/Reimbursment';
import { Roles } from '../modules/User';

class ReimbursmentService {
  constructor(
    private repo = userRepo,
  ) {}

  // creates a new reimbursement with the given data and add it to the repo
  async createReimbursment(
    employee: string, amount: number, date: number,
    format: string, location: string, description: string,
  )
    : Promise<boolean> {
    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const newRei = new Reimbursment(id, employee, 'Direct Supervisor', 'Department Head', amount, date, format, '', location, description);

    return this.repo.addReimbursment(newRei);
  }

  // returns all reimbursements for a user
  async getMyReimbursment(employee :string): Promise<Reimbursment[]> {
    return this.repo.getByEmployee(employee);
  }

  // returns all reimbursements in a particular stage
  async getMyWork(role :Roles): Promise<Reimbursment[]> {
    if(role === 'Benefits Coordinator') {
      return this.repo.getBenCoStage();
    }

    return this.repo.getByStage(role);
  }

  // update a reimbursements amount
  async updateReimbursmentAmount(id: number, newAmount: number): Promise<boolean> {
    const reimbursement = await this.repo.getById(id);

    if(reimbursement) {
      reimbursement.amount = newAmount;
      if(await this.repo.updateReimbursment(reimbursement)) {
        return true;
      }
    }
    return false;
  }

  // move a reimbursement to the next stage
  async updateToNextStage(id: number, description: string): Promise<boolean> {
    const reimbursement = await this.repo.getById(id);

    if(reimbursement) {
      reimbursement.description = description;
      reimbursement.stage = reimbursement.nextStage;

      switch (reimbursement.nextStage) {
      case 'Direct Supervisor': {
        reimbursement.nextStage = 'Department Head';
        break;
      }
      case 'Department Head': {
        reimbursement.nextStage = 'Benefits Coordinator';
        break;
      }
      case 'Benefits Coordinator': {
        reimbursement.nextStage = 'Approved';
        break;
      }
      case 'Approved': {
        reimbursement.nextStage = 'Graded';
        break;
      }
      case 'Graded': {
        reimbursement.nextStage = 'Done';
        break;
      }
      default: {
        break;
      }
      }

      if(await this.repo.updateReimbursment(reimbursement)) {
        return true;
      }
    }
    return false;
  }

  // move back to employee stage
  async kickBackStage(id: number, description: string): Promise<boolean> {
    const reimbursement = await this.repo.getById(id);

    if(reimbursement) {
      reimbursement.description = description;
      if(reimbursement.stage !== 'Employee') {
        reimbursement.nextStage = reimbursement.stage;
      }
      reimbursement.stage = 'Employee';

      if(await this.repo.updateReimbursment(reimbursement)) {
        return true;
      }
    }
    return false;
  }
}

export default new ReimbursmentService();
