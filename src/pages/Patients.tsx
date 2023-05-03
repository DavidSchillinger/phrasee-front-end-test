import React, { useEffect, useMemo } from 'react';
import { fetchPatients, Patient } from '../store/patients';
import './Patients.css';
import { ascend, sortWith } from 'ramda';
import { useRootDispatch, useRootSelector } from '../store';

export const PatientsRoute = (): JSX.Element => {
  const dispatch = useRootDispatch();
  const state = useRootSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  switch (state.status) {
    case 'loading':
      return <article className="container">Loading patients...</article>;
    case 'failure':
      return <article className="container">Failed to load patients.</article>;
    case 'success':
      return <Patients patients={state.patients} />;
  }
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' });

function Patients(props: { patients: Patient[] }) {
  const { patients } = props;

  const groups = useMemo(() => preparePatients(patients), [patients]);

  return (
    <article className="container">
      <h1>Patients:</h1>

      {Object.entries(groups).map(([id, group]) => (
        <section key={id} className="patient-level">
          <h2 className="level-title">{group.title}</h2>

          {group.patients.map((patient) => (
            <section key={patient.id} className="card patient">
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

const byDate = ascend<Patient>((patient) => patient.lastVisit);
const byName = ascend<Patient>((patient) => patient.name); // WARNING: Not locale-aware!
const sortPatients = sortWith([byDate, byName]);

// This would be nicer as an array but TS crashes with an unhelpful error.
type Groups = {
  a: { title: 'A-LEVEL'; patients: Patient[] };
  c: { title: 'C-LEVEL'; patients: Patient[] };
  d: { title: 'D-LEVEL'; patients: Patient[] };
};

function preparePatients(patients: Patient[]): Groups {
  // Alternatively we could use R.groupBy or a similar function.
  // R.groupBy doesn't guarantee all keys exist though, so not ideal in our case as types are exhaustive.
  return sortPatients(patients).reduce(
    (result, patient) => {
      switch (patient.type) {
        case 'a_level':
          result.a.patients.push(patient);
          break;
        case 'c_level':
          result.c.patients.push(patient);
          break;
        case 'd_level':
          result.d.patients.push(patient);
          break;
      }

      return result;
    },
    {
      a: { title: 'A-LEVEL', patients: [] },
      c: { title: 'C-LEVEL', patients: [] },
      d: { title: 'D-LEVEL', patients: [] },
    } as Groups
  );
}
