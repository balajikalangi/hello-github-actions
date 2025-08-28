import React from 'react';
import { Link } from 'react-router-dom';

const OpportunityItem = ({ opportunity: { _id, title, description, ngo } }) => {
  return (
    <div className="opportunity bg-light">
      <div>
        <h4>{title}</h4>
        <p><strong>NGO:</strong> {ngo.name}</p>
        <p>{description}</p>
        <Link to={`/opportunities/${_id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default OpportunityItem;
