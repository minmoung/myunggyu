export type PostAdmin = {
    status:string;
    row_id: string;
    user_id: string;
    user_nm: string;
    sex: string;
    phone_no: string;
    email: string;
    pwd: string;
    
  };
  
  export type GetAdmin = {
    row_id: string;
    user_id: string;
    user_nm: string;
    sex: string;
    phone_no: string;
    email: string;
    pwd: string;
  };

  export type GetCnt = {
    cnt: number;
  };