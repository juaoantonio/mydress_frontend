import { z, ZodType } from "zod";
import React from "react";

export type InputType<T extends ZodType> = {
    field: keyof z.infer<T>;
    label: string;
    placeholder?: string;
    inputComponentRender: (props: any) => React.ReactElement;
};
