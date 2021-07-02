import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("El titulo es requerido"),
  deadLine: yup
    .string()
    .required("El plazo es requerido"),
  startTime: yup
    .string()
    .required("La hora de inicio es requerida"),
  endTime: yup
    .string()
    .required("La hora de final es requerida"),
  remind: yup
    .string()
    .required("El recordatorio es requerido"),
 repeat: yup
    .string()
    .required("Este campo es requerido"),
});

const initialValues = {
  title: "",
  deadLine: "",
  startTime: "",
  endTime: "",
  remind: "",
  repeat: "",
};

export { validationSchema, initialValues };
