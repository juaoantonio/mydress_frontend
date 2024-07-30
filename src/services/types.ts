type SuccessOutputDto<DataType> = {
  body: DataType;
  errors: null;
};

type ErrorOutputDto = {
  body: null;
  errors: {
    code: number;
    content: any;
  };
};

export type CommonCreateUpdateOutputDto<DataType> =
  | SuccessOutputDto<DataType>
  | ErrorOutputDto;
