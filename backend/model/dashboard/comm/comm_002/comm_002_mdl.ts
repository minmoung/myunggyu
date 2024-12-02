

export type PostComm_002_01 = {
  row_id:string;
  top_menu_id: string;
  top_menu_nm: string;
  sort: string;
  insert_id: string;
  insert_date: string;
  update_id: string;
  update_date: string;
};

export type GetComm_002_01 = {
  top_menu_id: string;
  top_menu_nm: string;
  sort: string;
  insert_id: string;
  insert_date: string;
  update_id: string;
  update_date: string;
};

export type PostComm_002_02 = {
  status:string;
  row_id: string;
  top_menu_id: string;
  top_menu_nm: string;
  menu_id: string;
  menu_nm: string;
  href: string;
  sort: string;
  insert_id: string;
  insert_date: string;
  update_id: string;
  update_date: string;
  
};

export type GetComm_002_02 = {
  row_id: string;
  top_menu_id: string;
  top_menu_nm: string;
  menu_id: string;
  menu_nm: string;
  href: string;
  sort: string;
  insert_id: string;
  insert_date: string;
  update_id: string;
  update_date: string;
};


export type GetCnt = {
  cnt: number;
};