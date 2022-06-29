import { ProjectStatuses } from "../../../custom_types/enums";
import * as yup from "yup";

export type ProjectFormData = {
    name: string;
    description: string;
    status?: ProjectStatuses;
};

export const initFormValues: ProjectFormData = {
    name: "",
    description: "",
    status: ProjectStatuses.TO_DO
};

export const PrValidationSchema = yup.object().shape({
    name: yup.string().required("Required field"),
    description: yup.string().required("Required field"),
    status: yup.string()
});
