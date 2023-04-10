import * as yup from "yup";

export const LoginValidate =yup.object().shape({
    username: yup.string().trim().required("el username es requerido"),
    password:yup.string().trim().required("el password es requerido"),
})