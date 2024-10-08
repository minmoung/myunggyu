export type PostAdmin = {
    tran_gb:string;
    user_id: string;
    user_nm: string;
    sex: string;
    phone_no: string;
    email: string;
    pwd: string;
    
  };
  
  export type GetAdmin = {
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