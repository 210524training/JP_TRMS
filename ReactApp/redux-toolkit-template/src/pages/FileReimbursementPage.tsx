import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { sendReimbursementRequest } from '../ServerConnector/TRMS.api';

// a map of the different event types and the coverage percent
const options = new Map<string, number>([
  ['University Course', .8],
  ['Seminar', .6],
  ['Certification Prep Classes', .75],
  ['Certification', 1],
  ['Technical Training', .9],
  ['Other', .3]
])

const FileReimbursementPage: React.FC<unknown> = (props) => {
  const history = useHistory();

  const [date, setDate] = useState<number>(0);
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [cost, setCost] = useState<number>(0);
  const [grade, setGrade] = useState<string>('');
  const [type, setType] = useState<string>('University Course');

  // dynamically fill the drop down options with the keys from options
  const dropDownOption: JSX.Element[] = [];

  options.forEach((value: number, key: string) => {
    dropDownOption.push(<option value={key}>{key}</option>)
  });

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.valueAsNumber);
  };
  
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCost(Number(e.target.value));
  };

  const handleGradeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGrade(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if the entered date is not 2 weeks ahead do not accept
    // 2*7*24*60*60*1000 is 2 weeks in millisecoonds
    if(date > Date.now() + (2*7*24*60*60*1000)) {
      await sendReimbursementRequest(cost*(options.get(type) || 0), date, grade, location, description);

      history.push('/employee');
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleFormSubmit} >
        <div className="mb-3">
          <label htmlFor="dateInput" className="form-label">When will the event start?</label>
          <input type="date" className="form-control" id="dateInput" onChange={handleDateChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="locationInput" className="form-label">Where will the event take place?</label>
          <input type="text" className="form-control" id="locationInputInput" onChange={handleLocationChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="descriptionInput" className="form-label">Description</label>
          <input type="text" className="form-control" id="descriptionInput" onChange={handleDescriptionChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="gradeInput" className="form-label">What format is used to determine pass/fail?</label>
          <input type="text" className="form-control" id="gradeInput" onChange={handleGradeChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="costInput" className="form-label">How much does the event cost?</label>
          <input type="text" className="form-control" id="costInput" onChange={handleCostChange}/>
        </div>
        <div>
          <label htmlFor="typeSelect" className="form-label">What type of event is it?</label>
          <select name="typeSelect" id="typeSelect" onChange={handleTypeChange}>
            { dropDownOption }
          </select>
        </div>
        <div>
          {<p>You reimbursement amount will be: ${cost*(options.get(type) || 0)}</p> }
        </div>
        <input type="submit" className="btn btn-primary" value='Submit' />
      </form>
    </div>
  );
};

export default FileReimbursementPage;
