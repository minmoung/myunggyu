import { db } from "../../nodeMysql/database";
import { PostAdmin, GetAdmin, GetCnt } from "../../model/dashboard/dashboardModel";


export async function searchTopMenu(): Promise<Array<GetAdmin>> {
  const query: string =
    "select top_menu_id, top_menu_nm, sort from top_menus";
  return db.execute(query).then((result: any) => result[0]);
}

