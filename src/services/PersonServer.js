import {requestGet} from "../utils/request";
import API_NAME from "./apiNames";

export const fetchPersonInfo = async (params) => requestGet(API_NAME.INFO_PERSON,params, {});


