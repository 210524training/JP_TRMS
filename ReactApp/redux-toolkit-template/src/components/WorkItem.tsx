import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ReimbursementState, resetWork, selectReimbursements } from '../features/EmployeeWorkSlice/EmployeeWorkSlice';
import { sendApproveReimbursement, sendFile } from '../ServerConnector/TRMS.api';

type Props = {
    reimburementIndex: number
  }

const WorkItem: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const reimbursements = useAppSelector<ReimbursementState>(selectReimbursements) || [];
    const date = new Date(reimbursements[props.reimburementIndex].date);
    const id = reimbursements[props.reimburementIndex].id;

    const [updateDescription, setUpdateDescription] = useState<string>('');
    const [uploadFile, setUploadFile] = useState<File>();

    const handleUpdateDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setUpdateDescription(e.target.value);
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.files) {
        const file:File = e.target.files[0];
        setUploadFile(file);
      }
    }

    const handleResubmit = async () => {
      if(updateDescription !== '') {
        await sendApproveReimbursement(id, updateDescription);
        dispatch(resetWork());
      }
    }

    const handleSubmit = async () => {
      await sendApproveReimbursement(id, reimbursements[props.reimburementIndex].description);
      if(uploadFile) {
        await sendFile(id, uploadFile);
      }
      dispatch(resetWork());
    }
    
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
          {(reimbursements[props.reimburementIndex].stage === 'Employee') ? 
          <>
            <h5>Rejected due to:</h5>
            <p>
              {reimbursements[props.reimburementIndex].description}
            </p>
            <label htmlFor="newDescField" className="form-label">Give a new description</label>
            <textarea className="form-control" id="newDescField" onChange={handleUpdateDescriptionChange}/>
            <button className="btn btn-success" onClick={handleResubmit}>Resubmit</button>
          </> 
          : 
          <>
            <h5>Description</h5>
            <p>
              {reimbursements[props.reimburementIndex].description}
            </p>
          </> }
          {(reimbursements[props.reimburementIndex].stage === 'Approved') ?
          <>
          <label htmlFor="file" className="form-label">Upload proof of event completion</label>
          <input type="file" className="form-control"
                id="file" name="file"
                accept="image/png, image/jpeg"
                onChange={onFileChange}></input>
          <br/>
          <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
          </>
           : <></>}
        </div>
      );
};

export default WorkItem;
