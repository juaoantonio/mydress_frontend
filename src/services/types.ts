type SuccessOutputDto<DataType> = {
  data: DataType;
  errors: null;
};

type ErrorOutputDto = {
  data: null;
  errors: {
    code: number;
    content: any;
  };
};

export type CommonOutputDto<DataType> =
  | SuccessOutputDto<DataType>
  | ErrorOutputDto;
