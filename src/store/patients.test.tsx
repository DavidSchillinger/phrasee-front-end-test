import { fetchPatients } from './patients';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve()),
}));

const setup = () => {
  const axiosGetSpy = axios.get as jest.Mock;
  const dispatchSpy = jest.fn();
  const fetch = () => fetchPatients()(dispatchSpy, () => null as any, null);

  return { axiosGetSpy, dispatchSpy, fetch };
};

describe('fetchPatients', () => {
  it('should dispatch fetchLoading while loading', async () => {
    const { dispatchSpy, fetch } = setup();
    const promise = fetch();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenLastCalledWith({
      type: 'patients/fetchLoading',
    });

    await promise;
  });

  it('should dispatch fetchSucceeded after a successful fetch', async () => {
    const { axiosGetSpy, dispatchSpy, fetch } = setup();
    axiosGetSpy.mockResolvedValue({ data: { patients: [] } });
    await fetch();

    expect(axiosGetSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenLastCalledWith({
      type: 'patients/fetchSucceeded',
      payload: [],
    });
  });

  it('should dispatch fetchFailed after a failed fetch', async () => {
    const { axiosGetSpy, dispatchSpy, fetch } = setup();
    axiosGetSpy.mockRejectedValue('ERROR');
    await fetch();

    expect(axiosGetSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenLastCalledWith({
      type: 'patients/fetchFailed',
    });
  });
});
