import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getEmpWorkAsync, ReimbursementState, selectReimbursements } from '../features/EmployeeWorkSlice/EmployeeWorkSlice';
import WorkItem from './WorkItem';

const EmployeeWork: React.FC<unknown> = (props) => {
    const dispatch = useAppDispatch();
    const reimbursements = useAppSelector<ReimbursementState>(selectReimbursements) || [];

    const [workIndex, setWorkIndex] = useState<number>(0);

    // dynamically fill the drop down options with the keys from options
    const workItems: JSX.Element[] = [];

    for(let i = 0; i < reimbursements.length; i++) {
        workItems.push(<WorkItem reimburementIndex={i}></WorkItem>)
    }

    const handleRefresh = async () => {
      await dispatch(getEmpWorkAsync({}));
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
    
    // plan add left right arrow to change current work item

    return (
        <div className='container'>
          <h2>My work items</h2>
          <button className="btn btn-primary" onClick={handleRefresh} style={{margin: '5px'}}>Refresh</button>
          {reimbursements.length > 0 ? (<WorkItem reimburementIndex={workIndex}></WorkItem>) : (<></>) }
          <span>
            <button className="btn btn-primary" onClick={decrementWork} style={{margin: '2px'}}>{'<'}-</button>
            <button className="btn btn-primary" onClick={incrementWork} style={{margin: '2px'}}>-{'>'}</button>
          </span>
        </div>
      );
};

export default EmployeeWork;
