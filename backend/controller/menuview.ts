import { Request, Response } from "express";
import { PostMenu, GetMenu, GetTopMenu, PostTopMenu } from "../model/menuView";
import * as menuViewData from "../data/menuview";


// 모든 admin user 들을 배열로 전송하도록 설계
export async function searchMenu(req: Request, res: Response) {
  const searchInfo: Array<GetMenu> = await menuViewData.searchMenu();
  res.send(searchInfo);
}


// Save
export async function saveMenu(req: Request, res: Response) {
//  export async function saveMenu(req: Request, res: Response, next: NextFunction): Promise<void> => {
    
  const saveInfo: PostMenu = req.body;
  console.log("saveInfo.tran_gb : ",saveInfo.tran_gb);
  let saveId;
  let userCnt;
   try {

    if(saveInfo.tran_gb == "insert")
    {
      userCnt = await menuViewData.checkMenu(saveInfo);
      console.log("userCnt :",userCnt);
      if(userCnt[0].cnt < 1)
      {
        saveId = await menuViewData.insertMenu(saveInfo);
      }else{
        res.status(201).json({ message: "중복된 메뉴가 존재합니다.\n(" + saveInfo.menu_id + " : " + saveInfo.menu_nm +")"});
      }

    }else{
      saveId = await menuViewData.updateMenu(saveInfo);
    }

    // 정상적으로 saveId를 얻으면 클라이언트에 응답
    // return res.status(201).json({ saveId });
    res.status(201).json({ success: true, saveId });

  } catch (error) {
    console.error("Error during user save operation:", error);

    // 오류 발생 시 응답을 보낸 후 함수 종료
    // return res.status(500).json({ message: "Failed to save menu data" });
    res.status(500).json({ success: false, message: "Failed to update user" });
  }

}


// Delete
export async function deleteMenu(req: Request, res: Response) {
  const deleteInfo: PostMenu = req.body;
  const deleteId = await menuViewData.deleteMenu(deleteInfo);
  res.status(201).json({ deleteId: deleteId });
}



// 모든 admin user 들을 배열로 전송하도록 설계
export async function searchTopMenu(req: Request, res: Response) {
  const searchInfo: Array<GetTopMenu> = await menuViewData.searchTopMenu();
  res.send(searchInfo);
}


// Save
export async function saveTopMenu(req: Request, res: Response) {
  const saveInfo: PostTopMenu = req.body;
  console.log("saveInfo.tran_gb : ",saveInfo.tran_gb);
  let saveId;
  let menuTopCnt;
  try {

    if(saveInfo.tran_gb == "insert")
    {
      menuTopCnt = await menuViewData.checkMenuTop(saveInfo);
      
      if(menuTopCnt[0].cnt < 1)
      {
        saveId = await menuViewData.insertTopMenu(saveInfo);
      }else{
        res.status(201).json({ message: "중복된 메뉴가 존재합니다.\n(" + saveInfo.top_menu_id + " : " + saveInfo.top_menu_nm +")"});
      }

    }else{
      saveId = await menuViewData.updateTopMenu(saveInfo);
    }

    // 정상적으로 saveId를 얻으면 클라이언트에 응답
    res.status(201).json({ saveId });

  } catch (error) {
    console.error("Error during user save operation:", error);

    // 오류 발생 시 응답을 보낸 후 함수 종료
    res.status(500).json({ message: "Failed to save menu data" });
  }
}


// Delete
export async function deleteTopMenu(req: Request, res: Response) {
  const deleteInfo: PostTopMenu = req.body;
  const deleteId = await menuViewData.deleteTopMenu(deleteInfo);
  res.status(201).json({ deleteId: deleteId });
}