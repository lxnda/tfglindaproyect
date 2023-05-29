import * as yup from "yup";

export const LoginValidate =yup.object().shape({
    email: yup.string().trim().required("el username es requerido"),
    contrasena:yup.string().trim().required("el password es requerido"),
})