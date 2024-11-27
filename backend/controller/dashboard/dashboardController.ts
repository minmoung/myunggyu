import { Request, Response } from "express";
import { PostMenuTop, GetMenuTop, GetMenu } from "../../model/dashboard/dashboardModel";
import * as dashboardData from "../../data/dashboard/dashboardData";


// 모든 admin user 들을 배열로 전송하도록 설계
export async function searchTopMenu(req: Request, res: Response) {
  try {
    const searchInfo: Array<GetMenuTop> = await dashboardData.searchTopMenu();
    res.send(searchInfo);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.' });
  }
}

// 모든 admin user 들을 배열로 전송하도록 설계
export async function searchMenu(req: Request, res: Response) {
  try {
    const searchInfo: Array<GetMenu> = await dashboardData.searchMenu();
    res.send(searchInfo);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.' });
  }
}

