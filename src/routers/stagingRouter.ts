import express, { Router } from 'express';
import reimbursmentService from '../services/reimbursmentService';

const stagingRouter = Router();

async function getMyWork(req: express.Request, res: express.Response): Promise<void> {
  if(req.session.user) {
    const myReim = await reimbursmentService.getMyWork(req.session.user.role);
    res.status(200).json(myReim);
  }
}

async function updateAmount(req: express.Request, res: express.Response): Promise<void> {
  const {
    id, amount,
  } = req.body;

  if(req.session.user) {
    // check that the current user is a BenCo, only BenCo can change reimbursement amount
    if(reimbursmentService.updateReimbursmentAmount(id, amount)) {
      res.status(200).send();
    } else {
      res.status(500).send();
    }
  }
}

async function nextStage(req: express.Request, res: express.Response): Promise<void> {
  const {
    id,
  } = req.body;

  if(req.session.user) {
    if(reimbursmentService.updateToNextStage(id)) {
      res.status(200).send();
    } else {
      res.status(500).send();
    }
  }
}

async function backAStage(req: express.Request, res: express.Response): Promise<void> {
  const {
    id,
  } = req.body;

  if(req.session.user) {
    if(reimbursmentService.kickBackStage(id)) {
      res.status(200).send();
    } else {
      res.status(500).send();
    }
  }
}

stagingRouter.get('/', getMyWork);
stagingRouter.put('/amount', updateAmount);
stagingRouter.put('/approve', nextStage);
stagingRouter.put('/decline', backAStage);

export default stagingRouter;
