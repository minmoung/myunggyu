import { Request, Response } from "express";
import { PostAdmin, GetAdmin } from "../model/userView";
import * as userViewData from "../data/userView";


// 모든 admin user 들을 배열로 전송하도록 설계
export async function searchUser(req: Request, res: Response) {
  const searchInfo: Array<GetAdmin> = await userViewData.searchUser();
  res.send(searchInfo);
}


// Save
export async function saveUser(req: Request, res: Response) {
  const saveInfo: PostAdmin = req.body;
  console.log("saveInfo.tran_gb : ",saveInfo.tran_gb);
  let saveId;
  let userCnt;
  try {

    if(saveInfo.tran_gb == "insert")
    {
      userCnt = await userViewData.checkUser(saveInfo);
      console.log("userCnt :",userCnt);
      if(userCnt[0].cnt < 1)
      {
        saveId = await userViewData.insertUser(saveInfo);
      }else{
        return res.status(201).json({ message: "중복된 사용자가 존재합니다.\n(" + saveInfo.user_id + " : " + saveInfo.user_nm +")"});
      }

    }else{
      saveId = await userViewData.updateUser(saveInfo);
    }

    // 정상적으로 saveId를 얻으면 클라이언트에 응답
    return res.status(201).json({ saveId });

  } catch (error) {
    console.error("Error during user save operation:", error);

    // 오류 발생 시 응답을 보낸 후 함수 종료
    return res.status(500).json({ message: "Failed to save user data" });
  }
  // res.status(201).json({ saveId: saveId });
}


// Delete
export async function deleteUser(req: Request, res: Response) {
  const deleteInfo: PostAdmin = req.body;
  const deleteId = await userViewData.deleteUser(deleteInfo);
  res.status(201).json({ deleteId: deleteId });
}

