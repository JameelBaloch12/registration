import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RegisterEvent = () => {
  const { id } = useParams();
  const email = localStorage.getItem('email'); // or from state/form

  useEffect(() => {
    const newNotification = {
      eventId: id,
      user: email || 'Anonymous',
      time: new Date().toLocaleString(),
    };

    const old = JSON.parse(localStorage.getItem('adminNotifications')) || [];
    old.push(newNotification);
    localStorage.setItem('adminNotifications', JSON.stringify(old));
  }, [id, email]);

  return (
    <div>
      <h2>You are registered for event #{id}</h2>
    </div>
  );
};

export default RegisterEvent;
