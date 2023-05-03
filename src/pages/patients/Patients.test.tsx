import React from 'react';
import { render } from '@testing-library/react';
import { Patients, PatientsRoute } from './Patients';
import { useRootSelector } from '../../store';
import { Patient } from '../../store/patients';

// I'm unfamiliar with testing Redux, would we mock these hooks, or the store provider?
jest.mock('../../store', () => ({
  useRootDispatch: jest.fn(() => () => null),
  useRootSelector: jest.fn(),
}));

const useRootSelectorSpy = useRootSelector as unknown as jest.Spied<
  typeof useRootSelector
>;

describe('PatientsRoute', () => {
  it('should display the correct content depending on fetch status', () => {
    useRootSelectorSpy.mockReturnValue({ status: 'loading' });
    const { getByText, queryByText, rerender } = render(<PatientsRoute />);
    expect(getByText('Loading patients…')).toBeVisible();
    expect(queryByText('Patients:')).toBe(null);

    useRootSelectorSpy.mockReturnValue({ status: 'failure' });
    rerender(<PatientsRoute />);
    expect(getByText('Failed to load patients.')).toBeVisible();
    expect(queryByText('Patients:')).toBe(null);

    useRootSelectorSpy.mockReturnValue({ status: 'success', patients: [] });
    rerender(<PatientsRoute />);
    expect(getByText('Patients:')).toBeVisible();
  });
});

describe('Patients', () => {
  const data: Patient[] = [
    {
      id: 'complete',
      name: 'Complete',
      type: 'd_level',
      joined: new Date(),
      lastVisit: new Date(),
      isCompleted: true,
    },
    {
      id: 'a',
      name: 'Patient A',
      type: 'd_level',
      joined: new Date(),
      lastVisit: new Date(),
      isCompleted: false,
    },
    {
      id: 'c',
      name: 'Patient C',
      type: 'c_level',
      joined: new Date(),
      lastVisit: new Date(),
      isCompleted: false,
    },
    {
      id: 'b',
      name: 'Patient B',
      type: 'c_level',
      joined: new Date(),
      lastVisit: new Date(),
      isCompleted: false,
    },
  ];

  it('should display patient details grouped and sorted', () => {
    const { getByText, queryByText, getAllByTestId } = render(
      <Patients patients={data} />
    );
    expect(getByText('Patients:')).toBeVisible();
    expect(queryByText('Complete')).toBe(null);

    const levels = getAllByTestId('patient-level');
    expect(levels).toHaveLength(2);
    expect(levels[0]).toHaveTextContent('C_LEVEL');
    expect(levels[0]).toHaveTextContent('Patient B');
    expect(levels[0]).toHaveTextContent('Patient C');
    expect(levels[1]).toHaveTextContent('D_LEVEL');
    expect(levels[1]).toHaveTextContent('Patient A');

    const patients = getAllByTestId('patient-details');
    expect(patients[0]).toHaveTextContent('Patient B');
    expect(patients[0]).toHaveTextContent('Patient C');
    expect(patients[0]).toHaveTextContent('Patient A');
  });
});
