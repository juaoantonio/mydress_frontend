export type CreateAdjustmentDto = {
    label: string;
    description: string;
    dress: string;
    booking: string;
};

export type CreateManyAdjustmentsDto = {
    booking: string;
    adjustments: CreateAdjustmentDto[];
};
