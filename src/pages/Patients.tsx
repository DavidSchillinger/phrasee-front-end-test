import React, { useEffect } from 'react';
import { useRootDispatch, useRootSelector } from '../store';
import { fetchPatients } from '../store/patients';

export const Patients = (): JSX.Element => {
  const dispatch = useRootDispatch();
  const patients = useRootSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  switch (patients.status) {
    case 'loading':
      return <p>Loading patients...</p>;
    case 'failure':
      return <p>Error retrieving patients!</p>;
    case 'success':
      return <p>Success!</p>;
  }
};
