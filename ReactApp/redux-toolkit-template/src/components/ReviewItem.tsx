import React from 'react';
import { useAppSelector } from '../app/hooks';
import { ReimbursementState, selectReimbursements } from '../features/EmployeeWorkSlice/EmployeeWorkSlice';

type Props = {
    reimburementIndex: number
  }

const ReviewItem: React.FC<Props> = (props) => {
    const reimbursements = useAppSelector<ReimbursementState>(selectReimbursements) || [];
    const date = new Date(reimbursements[props.reimburementIndex].date);
    
    return (
        <div className='container'>
          <h2>Work item #{props.reimburementIndex}</h2>
          <h5>Location</h5>
          <p>
            {reimbursements[props.reimburementIndex].location}
          </p>
          <h5>Date</h5>
          <p>
            {date.toDateString()}
          </p>
          <h5>Grade format</h5>
          <p>
            {reimbursements[props.reimburementIndex].gradeFormat}
          </p>
          <h5>Description</h5>
          <p>
            {reimbursements[props.reimburementIndex].description}
          </p>
        </div>
      );
};

export default ReviewItem;
