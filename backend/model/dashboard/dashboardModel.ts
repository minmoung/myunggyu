export type PostAdmin = {
    tran_gb:string;
    top_menu_id: string;
    top_menu_nm: string;
    sort: string;
    insert_id: string;
    insert_date: string;
    update_id: string;
    update_date: string;
  };
  
  export type GetAdmin = {
    top_menu_id: string;
    top_menu_nm: string;
    sort: string;
    insert_id: string;
    insert_date: string;
    update_id: string;
    update_date: string;
  };

  export type GetCnt = {
    cnt: number;
  };