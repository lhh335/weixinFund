import { requestGet,requestPost } from "../utils/request";
import API_NAME from "./apiNames";

// export const init = async () => requestGet(API_NAME.APP_INIT, {}, {});

 export const fetchRcordList = async (params) => requestGet(API_NAME.APP_fetchRcordList,params, {});