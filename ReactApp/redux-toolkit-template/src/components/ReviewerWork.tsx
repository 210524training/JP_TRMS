import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getReviewWorkAsync, ReimbursementState, selectReimbursements } from '../features/EmployeeWorkSlice/EmployeeWorkSlice';
import ReviewButtons from './ReviewButtons';
import ReviewItem from './ReviewItem';

const ReviewerWork: React.FC<unknown> = (props) => {
    const dispatch = useAppDispatch();
    const reimbursements = useAppSelector<ReimbursementState>(selectReimbursements) || [];

    const handleApprove = async (id: number) => {
        console.log(id);
    }

    const handleReject = async (id: number) => {
        console.log(id);
    }

    // dynamically fill the drop down options with the keys from options
    const workItems: JSX.Element[] = [];

    for(let i = 0; i < reimbursements.length; i++) {
        workItems.push(<>
                            <ReviewItem reimburementIndex={i}></ReviewItem>
                            <ReviewButtons id={reimbursements[i].id} approve={handleApprove} reject={handleReject}></ReviewButtons>
                        </>)
    }

    const handleRefresh = async () => {
      await dispatch(getReviewWorkAsync({}));
    };
    
    // plan add left right arrow to change current work item

    return (
        <div className='container'>
          <h2>My work items</h2>
          <button className="btn btn-primary" onClick={handleRefresh}><span className="glyphicon glyphicon-refresh"></span> Refresh</button>
          {workItems}
        </div>
      );
};

export default ReviewerWork;
