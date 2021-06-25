import React from 'react';

type Props = {
    id: number,
    approve: Function,
    reject: Function,
}

const ReviewButtons: React.FC<Props> = (props) => {
    const handleApprove = async () => {
        props.approve(props.id);
    }

    const handleReject = async () => {
        props.reject(props.id);
    }

    return (
        <span>
            <button className="btn btn-success" onClick={handleApprove} style={{margin: '5px'}}>Approve</button>
            <button className="btn btn-danger" onClick={handleReject} style={{margin: '5px'}}>Reject</button>
        </span>
      );
};

export default ReviewButtons;