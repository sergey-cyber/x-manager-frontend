import { Select, MenuItem, FormControl, InputLabel, Grid, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { ProjectFormData, PrValidationSchema } from "./schema";
import { ProjectStatuses } from "../../../custom_types/enums";

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
    defaultValues?: Partial<ProjectFormData>;
    onSubmit: (data: ProjectFormData) => void;
    isSubmitting?: boolean;
}

export function ProjectForm(props: Props) {
    const { mode, defaultValues, onSubmit, isSubmitting } = props;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ProjectFormData>({ resolver: yupResolver(PrValidationSchema) });

    const withErrorLabel = useCallback(
        (field: keyof ProjectFormData, label: string) => errors[field]?.message || label,
        [errors]
    );

    const submit = useCallback(
        (data: ProjectFormData) => {
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
                                <MenuItem value={ProjectStatuses.TO_DO}>TO DO</MenuItem>
                                <MenuItem value={ProjectStatuses.IN_PROGRESS}>In progress</MenuItem>
                                <MenuItem value={ProjectStatuses.RESOLVED}>Resolved</MenuItem>
                                <MenuItem value={ProjectStatuses.CLOSED}>Closed</MenuItem>
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
