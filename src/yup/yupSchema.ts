import yup from "yup";
import { FIELDS } from "./fields.ts";

// parse and assert validity
const UserSchema = yup.object().shape({
  name: FIELDS.user.name.required(),
  email: FIELDS.user.email.required(),
  phone: FIELDS.user.phone.required(),
  password: FIELDS.user.password.required(),
});

export default UserSchema;
