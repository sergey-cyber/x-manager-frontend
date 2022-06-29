import { Select, MenuItem, FormControl, InputLabel, Grid, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { TaskStatuses, TaskTypes } from "../../../../custom_types/enums";
import { TaskIcon } from "../../../common/taskIcon/TaskIcon";
import { TaskFormData } from "../../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCallback } from "react";

const FormContainer = styled.form`
    background-color: #fff;
    padding: 20px;
`;

const StyledGrid = styled(Grid)`
    padding: 10px 0;
`;

const ActionBox = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
`;

const Title = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    padding: 10px 0;
`;

interface Props {
    mode?: "CREATE" | "UPDATE";
    defaultValues?: Partial<TaskFormData>;
    onSubmit: (data: TaskFormData) => void;
    isSubmitting?: boolean;
}

// form validation rules
const validationSchema = yup.object().shape({
    name: yup.string().required("Required field"),
    description: yup.string().required("Required field"),
    type: yup.string().required("Required field"),
    status: yup.string()
    /* password: yup
        .string()
        .transform((x) => (x === "" ? undefined : x))
        .concat(isAddMode ? yup.string().required("Password is required") : null)
        .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
        .string()
        .transform((x) => (x === "" ? undefined : x))
        .when("password", (password, schema) => {
            if (password || isAddMode) return schema.required("Confirm Password is required");
        })
        .oneOf([yup.ref("password")], "Passwords must match") */
});

export function TaskForm(props: Props) {
    const { mode, defaultValues, onSubmit, isSubmitting } = props;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TaskFormData>({ resolver: yupResolver(validationSchema) });

    const withErrorLabel = useCallback(
        (field: keyof TaskFormData, label: string) => errors[field]?.message || label,
        [errors]
    );

    const submit = useCallback(
        (data: TaskFormData) => {
            onSubmit(data);
        },
        [onSubmit]
    );

    return (
        <FormContainer onSubmit={handleSubmit(submit)}>
            <Title>Title</Title>
            <StyledGrid alignItems="center" container>
                <Grid item xs={3}>
                    Name:
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        {...register("name")}
                        defaultValue={defaultValues?.name || ""}
                        fullWidth
                        variant="outlined"
                        label={withErrorLabel("name", "Name")}
                        error={!!errors.name}
                    />
                </Grid>
            </StyledGrid>
            <StyledGrid alignItems="start" container>
                <Grid item xs={3}>
                    Description:
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        defaultValue={defaultValues?.description || ""}
                        {...register("description")}
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        label={withErrorLabel("description", "Description")}
                        error={!!errors.description}
                    />
                </Grid>
            </StyledGrid>
            <StyledGrid alignItems="center" container>
                <Grid item xs={3}>
                    Type:
                </Grid>
                <Grid item xs={9}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            {...register("type")}
                            defaultValue={defaultValues?.type}
                            label={withErrorLabel("type", "Type")}
                            labelId="demo-simple-select-label"
                            error={!!errors.type}
                        >
                            <MenuItem value={TaskTypes.BUGFIX}>
                                <TaskIcon caption="Bug" size={16} type={TaskTypes.BUGFIX} />
                            </MenuItem>
                            <MenuItem value={TaskTypes.TASK}>
                                <TaskIcon caption="Task" size={16} type={TaskTypes.TASK} />
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </StyledGrid>
            {mode === "UPDATE" && (
                <StyledGrid alignItems="center" container>
                    <Grid item xs={3}>
                        Status:
                    </Grid>
                    <Grid item xs={9}>
                        <FormControl fullWidth>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                {...register("status")}
                                label={withErrorLabel("status", "Status")}
                                labelId="status-label"
                                defaultValue={defaultValues?.status}
                                error={!!errors.status}
                            >
                                <MenuItem value={TaskStatuses.TO_DO}>TO DO</MenuItem>
                                <MenuItem value={TaskStatuses.IN_PROGRESS}>In progress</MenuItem>
                                <MenuItem value={TaskStatuses.RESOLVED}>Resolved</MenuItem>
                                <MenuItem value={TaskStatuses.CLOSED}>Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </StyledGrid>
            )}

            <ActionBox>
                <Button disabled={isSubmitting} type="submit" variant="contained">
                    {isSubmitting ? "Please wait..." : "Отправить"}
                </Button>
            </ActionBox>
        </FormContainer>
    );
}
