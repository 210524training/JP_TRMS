import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ReimbursementState, resetWork, selectReimbursements } from '../features/EmployeeWorkSlice/EmployeeWorkSlice';
import { sendApproveReimbursement, sendDenyReimbursement } from '../ServerConnector/TRMS.api';
import ReviewButtons from './ReviewButtons';

type Props = {
    reimburementIndex: number
  }

const ReviewItem: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const reimbursements = useAppSelector<ReimbursementState>(selectReimbursements) || [];
    const date = new Date(reimbursements[props.reimburementIndex].date);
    
    const [rejectReason, setRejectReason] = useState<string>('');

    const handleRejReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setRejectReason(e.target.value);
    };

    const handleApprove = async (id: number) => {
      await sendApproveReimbursement(id, reimbursements[props.reimburementIndex].description);
      dispatch(resetWork());
    }

    const handleReject = async (id: number) => {
      if(rejectReason !== '') {
        await sendDenyReimbursement(id, rejectReason);
        dispatch(resetWork());
      }
    }

    return (
        <div className='container'>
          <h2>Work item #{props.reimburementIndex}</h2>
          <h5>Requester</h5>
          <p>
            {reimbursements[props.reimburementIndex].employee}
          </p>
          <h5>Location</h5>
          <p>
            {reimbursements[props.reimburementIndex].location}
          </p>
          <h5>Date</h5>
          <p>
            {date.toDateString()}
          </p>
          <h5>Current approval stage</h5>
          <p>
            {reimbursements[props.reimburementIndex].stage}
          </p>
          <h5>Grade format</h5>
          <p>
            {reimbursements[props.reimburementIndex].gradeFormat}
          </p>
          <h5>Reimbursement amount</h5>
          <p>
            {reimbursements[props.reimburementIndex].amount}
          </p>
          <h5>Description</h5>
          <p>
            {reimbursements[props.reimburementIndex].description}
          </p>
          <label htmlFor="rejectField" className="form-label">Rejection reason</label>
          <textarea className="form-control" id="rejectField" onChange={handleRejReasonChange}/>
          <ReviewButtons id={reimbursements[props.reimburementIndex].id} approve={handleApprove} reject={handleReject}></ReviewButtons>
        </div>
      );
};

export default ReviewItem;
