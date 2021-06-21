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
            <button className="btn btn-success" onClick={handleApprove}>Approve</button>
            <button className="btn btn-danger" onClick={handleReject}>Reject</button>
        </span>
      );
};

export default ReviewButtons;