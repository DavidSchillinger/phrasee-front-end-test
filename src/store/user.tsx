import { ThunkAction } from '@reduxjs/toolkit';
import axios, { isAxiosError } from 'axios';
import { RootState } from './index';
import { navigateToPatients, RouterActions } from './router';

type Initial = { token: null; status: 'initial' };
type Failed = { token: null; status: 'failed' };
type IncorrectDetails = { token: null; status: 'incorrect' };
type Success = { token: string; status: 'success' };

type UserState = Initial | Failed | IncorrectDetails | Success;

// I've never done this with Redux, but I imagine we'd want to initialise the token from persistent storage to
// automatically log the user in if the token hasn't expired yet.
const initialState: UserState = {
  token: null,
  status: 'initial',
};

const loginSucceeded = (token: string) => ({
  type: 'user/loginSucceeded' as const,
  payload: token,
});

const loginDetailsIncorrect = () => ({
  type: 'user/loginDetailsIncorrect' as const,
});

const loginFailed = () => ({
  type: 'user/loginFailed' as const,
});

export type UserActions =
  | ReturnType<typeof loginSucceeded>
  | ReturnType<typeof loginFailed>
  | ReturnType<typeof loginDetailsIncorrect>;

export const loginUser =
  (details: {
    username: string;
    password: string;
  }): ThunkAction<void, RootState, unknown, UserActions | RouterActions> =>
  async (dispatch) => {
    // We don't display a loading indicator, so no initial/loading state dispatch here.

    try {
      const { data } = await axios.post(
        `https://run.mocky.io/v3/3669c83a-9ba1-4424-b08f-a8ef6d699966`,
        {
          username: details.username,
          password: details.password,
        }
      );

      // We don't actually use the token in any way in this test, but I'm passing it along and storing it
      // to show how this could be achieved in the real world. We'd also want to persist the token e.g. in localStorage.
      dispatch(loginSucceeded(data.token));
      dispatch(navigateToPatients());
    } catch (error) {
      if (isAxiosError(error) && error?.response?.status === 401) {
        dispatch(loginDetailsIncorrect());
      } else {
        dispatch(loginFailed());
      }
    }
  };

export function user(
  state: UserState = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case 'user/loginSucceeded':
      return { token: action.payload, status: 'success' };
    case 'user/loginFailed':
      return { token: null, status: 'failed' };
    case 'user/loginDetailsIncorrect':
      return { token: null, status: 'incorrect' };
  }

  return state;
}
