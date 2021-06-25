import axios from 'axios';
import Reimbursment from '../modules/Reimbursements';
import User from '../modules/User';

const grubdashClient = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'local' ? 'http://localhost:4000' : process.env.GRUBDASH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const sendLoginRequest = async (username: string, password: string): Promise<User> => {
  const {data: user} = await grubdashClient.post<User>('/login', {
    username,
    password,
  });
  
  return user;
}

export const sendLogoutRequest = async (): Promise<void> => {
  await grubdashClient.post('/logout');
}

export const sendReimbursementRequest = async (
  amount: number, date: number, gradeFormat: string, location: string, description: string
  ): Promise<void> => {
    await grubdashClient.post('/employee/submit', {
      amount, 
      date, 
      gradeFormat, 
      location, 
      description
    });
}

export const getEmployeeReimbursement = async (): Promise<Reimbursment[]> => {
  const {data: reimbursements} = await grubdashClient.get<Reimbursment[]>('/employee');

  return reimbursements;
}

export const getReviewReimbursement = async (): Promise<Reimbursment[]> => {
  const {data: reimbursements} = await grubdashClient.get<Reimbursment[]>('/reimbursement');

  return reimbursements;
}

export const sendApproveReimbursement = async (id: number, description: string) => {
  await grubdashClient.put('/reimbursement/approve', {id, description});
}

export const sendDenyReimbursement = async (id: number, description: string) => {
  await grubdashClient.put('/reimbursement/decline', {id, description});
}

export const sendFile = async (id: number, file: File) => {
  const formData = new FormData();
  formData.append('id', id.toString());
  formData.append('grade', file);
  await grubdashClient.post('/reimbursement/file', formData);
}