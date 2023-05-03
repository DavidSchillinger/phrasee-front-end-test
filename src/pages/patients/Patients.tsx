import React, { useEffect, useMemo } from 'react';
import { fetchPatients, Patient } from '../../store/patients';
import './Patients.css';
import { ascend, filter, groupBy, pipe, sortWith } from 'ramda';
import { useRootDispatch, useRootSelector } from '../../store';

export const PatientsRoute = (): JSX.Element => {
  const dispatch = useRootDispatch();
  const state = useRootSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  switch (state.status) {
    case 'loading':
      return <p className="container">Loading patients...</p>;
    case 'failure':
      return <p className="container">Failed to load patients.</p>;
    case 'success':
      return <Patients patients={state.patients} />;
  }
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' });

const prepare = pipe(
  // Remove completed patients.
  filter((patient: Patient) => !patient.isCompleted),
  // Sort by last visit then name.
  sortWith([
    ascend<Patient>((patient) => patient.lastVisit),
    ascend<Patient>((patient) => patient.name), // WARNING: Not locale-aware!
  ]),
  // Group by patient level/type.
  groupBy((patient) => patient.type),
  // Sort groups by group name.
  (groups) => Object.entries(groups).sort(ascend((group) => group[0]))
);

export function Patients(props: { patients: Patient[] }) {
  const { patients } = props;

  const groups = useMemo(() => prepare(patients), [patients]);

  return (
    <article className="container">
      <h1>Patients:</h1>

      {groups.map(([type, patients]) => (
        <section
          key={type}
          className="patient-level"
          data-testid="patient-level"
        >
          <h2 className="level-title">{type.toUpperCase()}</h2>

          {patients.map((patient) => (
            <section
              key={patient.id}
              className="card patient"
              data-testid="patient-details"
            >
              Name: {patient.name} <br />
              Joined: {dateFormatter.format(patient.joined)} <br />
              Last visit: {dateFormatter.format(patient.joined)} <br />
            </section>
          ))}
        </section>
      ))}
    </article>
  );
}
