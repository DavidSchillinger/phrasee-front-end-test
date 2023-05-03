// Note that a real router is much more complex and preferable, I wouldn't normally expect us to manually implement this!
// However, Redux usage for state was requested in the test description.
// I'd normally expect react-router or a router such as in Next.js for proper browser back/forward, URL updates, declarative routing, nesting, etc.

type RouterState = {
  route: 'login' | 'patients';
};

const initialState: RouterState = {
  route: 'login',
};

export const navigateToLogin = () => ({
  type: 'router/navigateToLogin' as const,
});

export const navigateToPatients = () => ({
  type: 'router/navigateToPatients' as const,
});

export type RouterActions =
  | ReturnType<typeof navigateToLogin>
  | ReturnType<typeof navigateToPatients>;

export function router(
  state: RouterState = initialState,
  action: RouterActions
): RouterState {
  switch (action.type) {
    case 'router/navigateToLogin':
      return { ...state, route: 'login' };
    case 'router/navigateToPatients':
      return { ...state, route: 'patients' };
  }

  return state;
}
