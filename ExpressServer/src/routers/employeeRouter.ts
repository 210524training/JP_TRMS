import express, { Router } from 'express';
import reimbursmentService from '../services/reimbursmentService';

const employeeRouter = Router();

async function submitReimbursement(req: express.Request, res: express.Response): Promise<void> {
  const {
    amount, date, gradeFormat, location, description,
  } = req.body;

  if(req.session.user) {
    const success = await reimbursmentService.createReimbursment(
      req.session.user.userName, amount, date, gradeFormat, location, description,
    );
    if(success) {
      res.status(201).send();
    } else {
      res.status(500).send();
    }
  }
}

async function getMyReimbursments(req: express.Request, res: express.Response): Promise<void> {
  if(req.session.user) {
    const myReim = await reimbursmentService.getMyReimbursment(req.session.user.userName);
    res.status(200).json(myReim);
  }
}

employeeRouter.post('/submit', submitReimbursement);
employeeRouter.get('/', getMyReimbursments);

export default employeeRouter;
