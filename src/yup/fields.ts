import yup from "yup";

export const FIELDS = {
  user: {
    name: yup.string().trim().max(15),
    email: yup.string().trim().email(),
    password: yup.string().trim().min(8).max(20),
    phone: yup
      .string()
      .trim()
      .length(9)
      .matches(/^9[0-9]+$/),
  },
};
