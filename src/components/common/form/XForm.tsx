// See all validation rules https://react-hook-form.com/api/useform/register

import { Button, Grid } from "@mui/material";
import { RegisterOptions, useForm } from "react-hook-form";
import styled from "styled-components";
import { withCapitalLetter } from "../../../utils/utils";
import React, { useCallback, useMemo } from "react";

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

const ErrorMessage = styled.p`
    color: red;
`;

export interface Rules {
    required:
        | boolean
        | string
        | {
              value: boolean;
              message: string;
          };
    maxLength:
        | number
        | {
              value: number;
              message: string;
          };
    minLength:
        | number
        | {
              value: number;
              message: string;
          };
    max:
        | number
        | {
              value: number;
              message: string;
          };
    min:
        | number
        | {
              value: number;
              message: string;
          };
    pattern:
        | RegExp
        | {
              value: RegExp;
              message: string;
          };
    validate: Function | Object;
}

export interface Item {
    name: string;
    caption: string | JSX.Element;
    control: JSX.Element;
    rules?: Partial<Rules>;
    disabled?: boolean;
    wrapper?: (children: JSX.Element) => JSX.Element;
}

interface Props {
    items: Item[];
    onSubmit?: (data: any) => void;
    defaultValues?: { [key: string]: any };
}

export function XForm({ items, onSubmit, defaultValues }: Props) {
    // TODO: не потставляются дефолтные значения в select mui
    const actualDefaultValues = useMemo(() => {
        if (defaultValues) {
            let values: { [key: string]: any } = {};
            const formFields = items.map((item) => item.name);
            for (const field of formFields) {
                if (defaultValues[field] === undefined) {
                    console.error(
                        `Incorrect props 'defaultValue'. Field ${field} does not match more than one form field`
                    );
                }
                values[field] = defaultValues[field];
            }
            return values;
        }
        return {};
    }, [defaultValues, items]);
    console.log(actualDefaultValues);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ defaultValues: actualDefaultValues });

    const submit = useCallback(
        (data: any) => {
            if (onSubmit) {
                onSubmit(data);
                reset();
            }
        },
        [onSubmit, reset]
    );

    return (
        <FormContainer onSubmit={handleSubmit(submit)}>
            <Title>Title</Title>
            {items.map((item, i) => {
                const options = { ...((item.rules as Partial<RegisterOptions>) || {}), disabled: item.disabled };
                const props: any = { ...register(item.name, options) };
                // TODO: у некоторых компонент нет свойства error, из-за этого падает warning в консоли. Нужно как-то валидировать
                props.error = !!errors[item.name];
                let control;
                if (item.wrapper) {
                    const child = React.cloneElement(item.control, { ...props });
                    control = React.cloneElement(item.wrapper(child));
                } else {
                    control = React.cloneElement(item.control, { ...props });
                }
                return (
                    <StyledGrid alignItems="center" container key={i}>
                        <Grid item xs={3}>
                            {item.caption}
                        </Grid>
                        <Grid item xs={9}>
                            {control}
                            <ErrorMessage>{withCapitalLetter(errors[item.name]?.message)}</ErrorMessage>
                        </Grid>
                    </StyledGrid>
                );
            })}
            <ActionBox>
                <Button type="submit" variant="contained">
                    Отправить
                </Button>
            </ActionBox>
        </FormContainer>
    );
}
