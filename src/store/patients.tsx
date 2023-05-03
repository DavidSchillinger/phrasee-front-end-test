import { ThunkAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './index';
import { parseISO } from 'date-fns';

export type PatientType = 'a_level' | 'c_level' | 'd_level';

type ApiPatient = {
  _id: string;
  name: string;
  type: PatientType;
  joined: string; // ISO8601
  hospital_id: string;
  last_visit_date: string; // ISO8601
  is_completed: false | { [key: string]: unknown };
};

export type Patient = {
  id: string;
  name: string;
  type: PatientType;
  joined: Date;
  lastVisit: Date;
  isCompleted: boolean;
};

type Loading = { status: 'loading' };
type Failure = { status: 'failure' };
type Success = { status: 'success'; patients: Patient[] };

type PatientsState = Loading | Failure | Success;

const initialState: PatientsState = { status: 'loading' };

const fetchPatientsLoading = () => ({
  type: 'patients/fetchLoading' as const,
});

const fetchPatientsSucceeded = (patients: Patient[]) => ({
  type: 'patients/fetchSucceeded' as const,
  payload: patients,
});

const fetchPatientsFailed = () => ({
  type: 'patients/fetchFailed' as const,
});

export type PatientsActions =
  | ReturnType<typeof fetchPatientsLoading>
  | ReturnType<typeof fetchPatientsSucceeded>
  | ReturnType<typeof fetchPatientsFailed>;

export const fetchPatients =
  (): ThunkAction<void, RootState, unknown, PatientsActions> =>
  async (dispatch) => {
    dispatch(fetchPatientsLoading());

    try {
      const { data } = await axios.get<{ patients: ApiPatient[] }>(
        `https://run.mocky.io/v3/3669c83a-9ba1-4424-b08f-a8ef6d699966`
      );
      dispatch(fetchPatientsSucceeded(data.patients.map(parsePatient)));
    } catch (error) {
      dispatch(fetchPatientsFailed());
    }
  };

export function patients(
  state: PatientsState = initialState,
  action: PatientsActions
): PatientsState {
  switch (action.type) {
    case 'patients/fetchFailed':
      return { status: 'failure' };
    case 'patients/fetchLoading':
      return { status: 'loading' };
    case 'patients/fetchSucceeded':
      return { status: 'success', patients: action.payload };
  }

  return state;
}

function parsePatient(raw: ApiPatient): Patient {
  return {
    id: raw._id,
    name: raw.name,
    type: raw.type,
    joined: parseISO(raw.joined),
    lastVisit: parseISO(raw.last_visit_date),
    isCompleted: raw.is_completed ? true : false,
  };
}
