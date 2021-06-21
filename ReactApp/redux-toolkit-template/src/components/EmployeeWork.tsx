import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getEmpWorkAsync, ReimbursementState, selectReimbursements } from '../features/EmployeeWorkSlice/EmployeeWorkSlice';
import WorkItem from './WorkItem';

const EmployeeWork: React.FC<unknown> = (props) => {
    const dispatch = useAppDispatch();
    const reimbursements = useAppSelector<ReimbursementState>(selectReimbursements) || [];

    // dynamically fill the drop down options with the keys from options
    const workItems: JSX.Element[] = [];

    for(let i = 0; i < reimbursements.length; i++) {
        workItems.push(<WorkItem reimburementIndex={i}></WorkItem>)
    }

    const handleRefresh = async () => {
      await dispatch(getEmpWorkAsync({}));
    };
    
    return (
        <div className='container'>
          <h2>My work items</h2>
          <button className="btn btn-primary" onClick={handleRefresh}><span className="glyphicon glyphicon-refresh"></span> Refresh</button>
          {workItems}
        </div>
      );
};

export default EmployeeWork;
