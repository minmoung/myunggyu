import { db } from "../../nodeMysql/database";
import { PostMenuTop, GetMenuTop, GetMenu, GetCnt } from "../../model/dashboard/dashboardModel";


export async function searchTopMenu(): Promise<Array<GetMenuTop>> {
  const query: string =
    "select top_menu_id, top_menu_nm, sort from top_menus";
    // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
    console.log('Executing SQL:', query);
    // console.log('With Parameters:', updateInfo);
  return db.execute(query).then((result: any) => result[0]);
}

export async function searchMenu(): Promise<Array<GetMenu>> {
  const query: string =
    "select top_menu_id, menu_id, menu_nm, sort from menus";
    // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
    console.log('Executing SQL:', query);
  return db.execute(query).then((result: any) => result[0]);
}

