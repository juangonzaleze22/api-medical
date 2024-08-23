import { Request, Response } from "express";
import { registerNewUser, loginUser, registerWithGoogle, loginUserWithGoogle } from "../services/auth.services";

const registerCtrl = async ({ body }: Request, res: Response) => {
  const responseUser = await registerNewUser(body);
  res.send(responseUser);
};

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  
  const responseUser = await loginUser({ email, password });
  res.send(responseUser);
};

const loginCtrlWithGoogle = async ({ body }: Request, res: Response) => {
  const { email } = body;
  const responseUser = await loginUserWithGoogle({ email });
  res.send(responseUser);
};

const registerCtrlWithGoogle = async ({ body }: Request, res: Response) => {
  const responseUser = await registerWithGoogle(body);
  res.send(responseUser);
};

export { loginCtrl, registerCtrl, registerCtrlWithGoogle, loginCtrlWithGoogle };