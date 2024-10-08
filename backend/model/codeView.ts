
export type PostUpCode = {
  up_code_cd: string;
  up_code_nm: string;
  sort: string;
  insert_id?: string;
  update_id?: string;
};

export type GetUpCode = {
  row_id : number;
  up_code_cd: string;
  up_code_nm: string;
  sort: string;
};

export type PostCode = {
  code_cd: string;
  code_nm: string;
  up_code_cd: string;
  sort: string;
  insert_id: string;
  update_id: string;
};

export type GetCode = {
  row_id : number;
  code_cd: string;
  code_nm: string;
  up_code_cd: string;
  sort: string;
};

export type GetCnt = {
  cnt: number;
};