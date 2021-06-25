import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getReviewWorkAsync, ReimbursementState, selectReimbursements } from '../features/EmployeeWorkSlice/EmployeeWorkSlice';
import ReviewItem from './ReviewItem';

const ReviewerWork: React.FC<unknown> = (props) => {
    const dispatch = useAppDispatch();
    const reimbursements = useAppSelector<ReimbursementState>(selectReimbursements) || [];

    const [workIndex, setWorkIndex] = useState<number>(0);

    const handleRefresh = async () => {
        await dispatch(getReviewWorkAsync({}));
    };

    const incrementWork = async () => {
      if(workIndex < reimbursements.length-1) {
        setWorkIndex(workIndex+1);
      }
    }

    const decrementWork = async () => {
      if(workIndex > 0) {
        setWorkIndex(workIndex-1);
      }
    }

    // dynamically fill the drop down options with the keys from options
    const workItems: JSX.Element[] = [];

    for(let i = 0; i < reimbursements.length; i++) {
        workItems.push(<>
                            <ReviewItem reimburementIndex={i}></ReviewItem>
                        </>)
    }
    
    // plan add left right arrow to change current work item

    return (
        <div className='container'>
          <h2>My work items</h2>
          <button className="btn btn-primary" onClick={handleRefresh} style={{margin: '5px'}}><span className="glyphicon glyphicon-refresh"></span> Refresh</button>
          {reimbursements.length > 0 ? (<ReviewItem reimburementIndex={workIndex}></ReviewItem>) : (<></>) }
          <span>
            <button className="btn btn-primary" onClick={decrementWork} style={{margin: '2px'}}>{'<'}-</button>
            <button className="btn btn-primary" onClick={incrementWork} style={{margin: '2px'}}>-{'>'}</button>
          </span>
        </div>
      );
};

export default ReviewerWork;
