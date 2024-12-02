import { db } from "../../nodeMysql/database";
import { PostMenuTop, GetMenuTop, GetMenu, GetCnt } from "../../model/dashboard/dashboardModel";
import { PostTopMenu } from "../../model/menuView";


export async function searchTopMenu(): Promise<Array<GetMenuTop>> {
  const query: string =
    "select top_menu_id, top_menu_nm, sort from top_menus order by sort";
    // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
    console.log('Executing SQL:', query);
    // console.log('With Parameters:', updateInfo);
  return db.execute(query).then((result: any) => result[0]);
}

export async function searchMenu(topMenu: PostTopMenu): Promise<Array<GetMenu>> {
  const { top_menu_id } = topMenu;
  const query: string =
    `select top_menu_id, 
            menu_id, 
            menu_nm, 
            href, 
            sort 
      from menus where top_menu_id = ? 
      order by sort`;
    // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
    console.log('Executing SQL:', query);
    console.log('With Parameters:', top_menu_id);
  return db.execute(query, [top_menu_id]).then((result: any) => result[0]);
}

