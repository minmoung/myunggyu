import { Request, Response } from "express";
import { PostUpCode, GetUpCode, PostCode, GetCode } from "../model/codeView";
import * as codeViewData from "../data/codeView";

// 모든 상위코드를 배열로 전송하도록 설계
export async function searchUpCode(req: Request, res: Response) {
  const searchInfo: Array<GetUpCode> = await codeViewData.searchUpCode();
  res.send(searchInfo);
}


export async function insertUpCode(req: Request, res: Response) {
  const saveInfos: PostUpCode[] = req.body; // 여러 행을 배열로 받음
  let saveIds: any[] = [];
  let duplicateInfos: PostUpCode[] = []; // 중복된 코드 정보를 저장할 배열

  try {
    for (const saveInfo of saveInfos) {
      console.log("===== selectCnt =====");
      const userCnt = await codeViewData.checkUpCode(saveInfo);
      console.log("userCnt :", userCnt);

      if (userCnt[0].cnt < 1) {
        const saveId = await codeViewData.insertUpCode(saveInfo);
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
          (info) => `(${info.up_code_cd} : ${info.up_code_nm})`
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


export async function updateUpCode(req: Request, res: Response) {
  const saveInfos: PostUpCode[] = req.body;
  let saveIds: any[] = [];

  try {
    for (const saveInfo of saveInfos) {
        const saveId = await codeViewData.updateUpCode(saveInfo);
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
export async function deleteUpCode(req: Request, res: Response) {
  const deleteInfos: PostUpCode[] = req.body;
  let deleteIds: any[] = [];

  for (const deleteInfo of deleteInfos) {
    const deleteId = await codeViewData.deleteUpCode(deleteInfo);
    deleteIds.push(deleteId);
  }
  // 모든 데이터를 성공적으로 저장한 후 응답
  res.status(201).json({ success: true, deleteIds });
}


// 모든 코드를 배열로 전송하도록 설계
export async function searchCode(req: Request, res: Response) {
  const searchInfo : GetUpCode[] = req.body;
  console.log("searchInfo   ::" , searchInfo[0]);
  const searchResult: Array<GetCode> = await codeViewData.searchCode(searchInfo);
  res.send(searchResult);
}


export async function insertCode(req: Request, res: Response) {
  const saveInfos: PostCode[] = req.body; // 여러 행을 배열로 받음
  let saveIds: any[] = [];
  let duplicateInfos: PostCode[] = []; // 중복된 코드 정보를 저장할 배열

  // const saveInfo: PostCode = req.body;
  
  // let saveId;
  // let userCnt;
  try {
    for (const saveInfo of saveInfos) {
      const userCnt = await codeViewData.checkCode(saveInfo);
      console.log("userCnt :",userCnt);
      if(userCnt[0].cnt < 1)
      {
        const saveId = await codeViewData.insertCode(saveInfo);
        saveIds.push(saveId);

      }else{
        duplicateInfos.push(saveInfo); // 중복된 데이터 저장
      }
    }

    if (duplicateInfos.length > 0) {
      // 중복된 데이터가 있을 경우
      res.status(201).json({
        success: false,
        message: `중복된 코드가 존재합니다.`,
        duplicates: duplicateInfos.map(
          (info) => `(${info.code_cd} : ${info.code_nm})`
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


export async function updateCode(req: Request, res: Response) {
  const saveInfos: PostCode[] = req.body; // 여러 행을 배열로 받음
  let saveIds: any[] = [];
 
  try {

    for (const saveInfo of saveInfos) {
      const saveId = await codeViewData.updateCode(saveInfo);
      saveIds.push(saveId);

    }
    // 모든 데이터를 성공적으로 저장한 후 응답
    res.status(201).json({ success: true, saveIds });

  } catch (error) {
    console.error("Error during user save operation:", error);

    // 오류 발생 시 응답을 보낸 후 함수 종료
    res.status(500).json({ success: false, message: "Failed to update query" });

  }

}


// Delete
export async function deleteCode(req: Request, res: Response) {
  const deleteInfo: PostCode = req.body;
  const deleteId = await codeViewData.deleteCode(deleteInfo);
  res.status(201).json({ deleteId: deleteId });
}

