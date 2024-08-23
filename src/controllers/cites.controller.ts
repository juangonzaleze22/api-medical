import { Request, Response } from "express";
import { 
  getCites,
  getCitesByUser,
  createCite,
  getCiteById,
  updateCite

 } from "../services/cites.services";

const getCitesCtrl = async ({params}: Request, res: Response) => {
  const { typeCite } = params
  const respondCite = await getCites(typeCite);
  res.status(201);
  res.send(respondCite);
};

const getCiteByIdCtrl = async ({ params }: Request, res: Response) => {
  const { id } = params
  const respondCite = await getCiteById(id);
  res.send(respondCite);
};

const getCiteByUserCtrl = async ({ params }: Request, res: Response) => {
  const { id, typeCite } = params
  const respondCites = await getCitesByUser(id, typeCite);
  res.send(respondCites);
};


const addCiteCtrl = async ({ body }: Request, res: Response) => {
  const respondCite = await createCite(body);
  res.send(respondCite);
};

/* const deleteCiteByIdCtrl = async ({ params }: Request, res: Response) => {
  const { id } = params
  const respondCite = await getCiteById(id);
  res.send(respondCite);
}; */

const updateCiteByIdCtrl = async ({ body, params }: Request, res: Response) => {
  const { id } = params;
  const respondCite = await updateCite({ body, id });
  res.send(respondCite);
};


export {
  getCitesCtrl,
  getCiteByIdCtrl,
  getCiteByUserCtrl,
  addCiteCtrl,
  updateCiteByIdCtrl
};