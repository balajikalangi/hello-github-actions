import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Opportunity = () => {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOpportunity = async () => {
      try {
        const res = await axios.get(`/api/opportunities/${id}`);
        setOpportunity(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    getOpportunity();
  }, [id]);

  const onApply = async () => {
    // TODO: Add authentication check
    try {
      await axios.post(`/api/opportunities/${id}/apply`);
      // TODO: Show a success message
      alert('You have successfully applied for this opportunity!');
    } catch (err) {
      console.error(err);
      // TODO: Show an error message
      alert('Error applying for this opportunity. You may have already applied.');
    }
  };

  return (
    <section className="container">
      {loading || !opportunity ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/opportunities" className="btn">
            Back To Opportunities
          </Link>
          <div className="opportunity-grid my-1">
            <div className="opportunity-top bg-primary p-2">
              <h1 className="large">{opportunity.title}</h1>
              <p className="lead">at {opportunity.ngo.name}</p>
              <p>{opportunity.location}</p>
            </div>

            <div className="opportunity-about bg-light p-2">
              <h2 className="text-primary">Description</h2>
              <p>{opportunity.description}</p>
              <div className="line"></div>
              <h2 className="text-primary">Required Skills</h2>
              <div className="skills">
                {opportunity.requiredSkills.map((skill, index) => (
                  <div key={index} className="p-1">
                    <i className="fas fa-check"></i> {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* TODO: Show apply button only for students */}
          <button onClick={onApply} className="btn btn-primary">
            Apply for this Opportunity
          </button>
        </>
      )}
    </section>
  );
};

export default Opportunity;
