const naiveIsEmail = /^[^@]+@[^@]{1,128}\.[^@]{1,6}$/;
const isAlphanumeric = /^[a-zA-Z0-9]+$/;
const containsNumber = /[0-9]/;
const containsCapital = /[A-Z]/;

export const requiredUsernameRule = {
  required: true,
  message: 'Please provide a valid email address!',
  validator: async (rule: unknown, value: string) => {
    if (!naiveIsEmail.test(value)) {
      throw new Error('email');
    }
  },
};

export const requiredPasswordRule = {
  required: true,
  message: 'Please provide a valid password!',
  validator: async (rule: unknown, value: string) => {
    // I think usually this validation should only be relevant for a registration password field,
    // so we're not including any UI to show the user why exactly the password is invalid.

    if (
      !isAlphanumeric.test(value) ||
      value.length < 8 ||
      value.length > 128 ||
      !containsNumber.test(value) ||
      !containsCapital.test(value)
    ) {
      throw new Error('password');
    }
  },
};
