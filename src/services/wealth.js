import { requestGet,requestPost } from "../utils/request";
import API_NAME from "./apiNames";

 export const getAllLists = async () => requestGet(API_NAME.APP_getAllLists, {}, {});

