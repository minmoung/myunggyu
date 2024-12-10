import { Request, Response } from "express";
import { PostSign, GetSign } from "../model/signIn_mdl";
import * as signInData from "../data/signIn_data";


// 모든 admin user 들을 배열로 전송하도록 설계
export async function searchSign(req: Request, res: Response) {
  const selectInfo: PostSign = req.body;

  try {
    const searchResult: Array<GetSign> = await signInData.searchSign(selectInfo);
    res.send(searchResult);
  } catch (error) {
    console.error("Error sign-in :", error);

    // 오류 발생 시 응답을 보낸 후 함수 종료
    res.status(500).json({ success: false, message: "Failed to sign-in" });
  }

}


