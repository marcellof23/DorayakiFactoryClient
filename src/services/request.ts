import axios from "../lib/axios";
import { IRequest } from "../utils/interface";

export const getRequests = async (): Promise<Array<IRequest>> => {
  const url = `/dorayaki-request`;
  const res = await axios.get(url);
  return res.data.data;
};

export const getRequest = async (
  dorayakirequest_id: number
): Promise<IRequest> => {
  const url = `/dorayaki-request/${dorayakirequest_id}`;
  const res = await axios.get(url);
  return res.data.data;
};

export const updateRequest = async (payload: IRequest) => {
  const url = `/dorayaki-request/${payload.dorayakirequest_id}`;
  const res = await axios.put(url, payload);
  return res.data.data;
};
