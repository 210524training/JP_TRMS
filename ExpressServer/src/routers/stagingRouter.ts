import express, { Router } from 'express';
import reimbursmentService from '../services/reimbursmentService';

import upload from '../repos/bucketRepo';

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
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  }
}

async function nextStage(req: express.Request, res: express.Response): Promise<void> {
  const {
    id,
    description,
  } = req.body;

  if(req.session.user) {
    if(reimbursmentService.updateToNextStage(id, description)) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  }
}

async function backAStage(req: express.Request, res: express.Response): Promise<void> {
  const {
    id,
    description,
  } = req.body;

  if(req.session.user) {
    if(reimbursmentService.kickBackStage(id, description)) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  }
}

async function uploadFile(req: express.Request, res: express.Response): Promise<void> {
  const {
    id,
  } = req.body;

  const {
    file,
  } = req;

  console.log(id);
  console.log(file);

  if(req.session.user) {
    res.status(200).end();
  }
}

stagingRouter.get('/', getMyWork);
stagingRouter.put('/amount', updateAmount);
stagingRouter.put('/approve', nextStage);
stagingRouter.put('/decline', backAStage);
stagingRouter.post('/file', upload.single('grade'), uploadFile);

export default stagingRouter;
