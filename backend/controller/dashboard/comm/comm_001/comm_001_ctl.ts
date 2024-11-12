import { Request, Response } from "express";
import { PostComm_001, GetComm_001 } from "../../../../model/dashboard/comm/comm_001/comm_001_mdl";
import * as comm_001_data from "../../../../data/dashboard/comm/comm_001/comm_001_data";


// 모든 admin user 들을 배열로 전송하도록 설계
export async function search01(req: Request, res: Response) {
  const searchInfo: Array<GetComm_001> = await comm_001_data.searchUser();
  res.send(searchInfo);
}


export async function insert01(req: Request, res: Response) {
  const saveInfos: PostComm_001[] = req.body; // 여러 행을 배열로 받음
  let saveIds: any[] = [];
  let duplicateInfos: PostComm_001[] = []; // 중복된 코드 정보를 저장할 배열

  try {
    for (const saveInfo of saveInfos) {
      console.log("===== selectCnt =====");
      const userCnt = await comm_001_data.checkUser(saveInfo);
      console.log("userCnt :", userCnt);

      if (userCnt[0].cnt < 1) {
        const saveId = await comm_001_data.insertUser(saveInfo);
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
          (info) => `(${info.user_id} : ${info.user_id})`
        ),
      });
      return;  // return을 해줘야 아래 중복적으로 호출하는것을 방지할수 있다.
    }

    // 모든 데이터를 성공적으로 저장한 후 응답
    res.status(201).json({ success: true, saveIds });

  } catch (error) {
    console.error("Error during user save operation:", error);

    // 오류 발생 시 응답을 보낸 후 함수 종료
    res.status(500).json({ success: false, message: "Failed to save user data" });
  }
}


export async function update01(req: Request, res: Response) {
  const saveInfos: PostComm_001[] = req.body;
  let saveIds: any[] = [];

  try {
    for (const saveInfo of saveInfos) {
        const saveId = await comm_001_data.updateUser(saveInfo);
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
export async function delete01(req: Request, res: Response) {

  const deleteInfos: PostComm_001[] = req.body;
  let deleteId: any[] = [];

  try {
    for (const deleteInfo of deleteInfos) {
        const saveId = await comm_001_data.deleteUser(deleteInfo);
        deleteId.push(saveId);
    }
    
    // 모든 데이터를 성공적으로 저장한 후 응답
    res.status(201).json({ success: true, deleteId });

  } catch (error) {
    console.error("Error during user save operation:", error);

    // 오류 발생 시 응답을 보낸 후 함수 종료
    res.status(500).json({ success: false, message: "Failed to update user" });
  }

}

