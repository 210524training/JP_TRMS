import express, { Router } from 'express';
// import User from '../modules/User';
import log from '../log';
import userService from '../services/userService';
import employeeRouter from './employeeRouter';
import stagingRouter from './stagingRouter';

const baseRouter = Router();

async function login(req: express.Request, res: express.Response): Promise<void> {
  const { username, password } = req.body;

  if(req.session.isLoggedIn) {
    log.error('Login was evoked when a user was already logged in\n');
    res.status(409).end();
    return;
  }

  const user = await userService.login(username, password);
  if(!user) {
    res.status(401).end();
    return;
  }

  req.session.isLoggedIn = true;

  req.session.user = user;
  const { userName, role, reimbursment } = user;

  res.status(202).json({ userName, role, reimbursment });

  log.debug(`${username} logged in`);
}

async function logout(req: express.Request, res: express.Response): Promise<void> {
  if(req.session.user) {
    const { userName } = req.session.user;

    req.session.destroy(() => {
      log.debug(`${userName} logged out`);
    });
  }

  res.status(202).end();
}

baseRouter.post('/login', login);
baseRouter.post('/logout', logout);
baseRouter.use('/employee', employeeRouter);
baseRouter.use('/reimbursement', stagingRouter);

export default baseRouter;
