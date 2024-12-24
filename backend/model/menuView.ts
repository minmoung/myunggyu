export type PostMenu = {
    tran_gb:string;
    top_menu_id:string;
    menu_id: string;
    menu_nm: string;
    href: string;
    use_yn: string;
    sort: string;
    insert_id: string;
    insert_date: string;
    update_id: string;
    update_date: string;
  };
  
  export type GetMenu = {
    top_menu_id:string;
    menu_id: string;
    menu_nm: string;
    href: string;
    use_yn: string;
    sort: string;
    insert_id: string;
    insert_date: string;
    update_id: string;
    update_date: string;
  };

  export type GetCnt = {
    cnt: number;
  };


  export type PostTopMenu = {
    tran_gb:string;
    top_menu_id: string;
    top_menu_nm: string;
    sort: string;
    insert_id: string;
    insert_date: string;
    update_id: string;
    update_date: string;
  };

  export type GetTopMenu = {
    top_menu_id: string;
    top_menu_nm: string;
    sort: string;
    insert_id: string;
    insert_date: string;
    update_id: string;
    update_date: string;
  };