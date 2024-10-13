import { Request, Response } from "express";
import { PostTemp, GetTemp } from "../model/tempView";
import * as tempData from "../data/tempData";


// 모든 admin user 들을 배열로 전송하도록 설계
export async function searchTemp(req: Request, res: Response) {
  const searchInfo: Array<GetTemp> = await tempData.searchRow();
  res.send(searchInfo);
}


export async function insertTemp(req: Request, res: Response) {
  const saveInfos: PostTemp[] = req.body; // 여러 행을 배열로 받음
  let saveIds: any[] = [];
  let duplicateInfos: PostTemp[] = []; // 중복된 코드 정보를 저장할 배열

  try {
    for (const saveInfo of saveInfos) {
      console.log("===== selectCnt =====");
      const userCnt = await tempData.checkRow(saveInfo);
      console.log("userCnt :", userCnt);

      if (userCnt[0].cnt < 1) {
        const saveId = await tempData.insertRow(saveInfo);
        saveIds.push(saveId);
      } else {
        duplicateInfos.push(saveInfo); // 중복된 데이터 저장
      }
    }

    if (duplicateInfos.length > 0) {
      // 중복된 데이터가 있을 경우
      res.status(201).json({
        success: false,
        message: `중복된 코드가 존재합니다.`,
        duplicates: duplicateInfos.map(
          (info) => `(${info.col1} : ${info.col1})`
        ),
      });
    }

    // 모든 데이터를 성공적으로 저장한 후 응답
    res.status(201).json({ success: true, saveIds });

  } catch (error) {
    console.error("Error during user save operation:", error);

    // 오류 발생 시 응답을 보낸 후 함수 종료
    res.status(500).json({ success: false, message: "Failed to save user data" });
  }
}


export async function updateTemp(req: Request, res: Response) {
  const saveInfos: PostTemp[] = req.body;
  let saveIds: any[] = [];

  try {
    for (const saveInfo of saveInfos) {
        const saveId = await tempData.updateRow(saveInfo);
        saveIds.push(saveId);
    }
    
    // 모든 데이터를 성공적으로 저장한 후 응답
    res.status(201).json({ success: true, saveIds });

  } catch (error) {
    console.error("Error during user save operation:", error);

    // 오류 발생 시 응답을 보낸 후 함수 종료
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
}

// Delete
export async function deleteTemp(req: Request, res: Response) {
  const deleteInfo: PostTemp = req.body;
  const deleteId = await tempData.deleteRow(deleteInfo);
  res.status(201).json({ deleteId: deleteId });
}

