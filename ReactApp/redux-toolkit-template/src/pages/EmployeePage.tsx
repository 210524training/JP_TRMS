import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import EmployeeWork from '../components/EmployeeWork';
import ReviewerWork from '../components/ReviewerWork';
import { logoutAsync, selectUser, UserState } from '../features/UserSlice/UserSlice';
import { resetWork } from '../features/EmployeeWorkSlice/EmployeeWorkSlice'

const EmployeePage: React.FC<unknown> = (props) => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const user = useAppSelector<UserState>(selectUser);

    const handleLogout = async () => {
        await dispatch(logoutAsync());
        dispatch(resetWork());
    
        history.push('/');
    }

    const newReimbursement = () => {
        history.push('/new');
    }

    return (
        <div className='container'>
            <input type="submit" className="btn btn-primary" value='Logout' onClick={handleLogout} style={{float: 'right'}}/>
            { user && <h1>Welcome {user.userName}</h1>}
            <br/>
            { (user && user.role === 'Employee') ? (
                <>
                  <EmployeeWork/>
                  <input type="submit" className="btn btn-primary" value='Open new reimbursement form' onClick={newReimbursement}/>
                </>
            ) : (
                <>
                    <ReviewerWork/> 
                </>
            )
            }
        </div>
      );
};

export default EmployeePage;
