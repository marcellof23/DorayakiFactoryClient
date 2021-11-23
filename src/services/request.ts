import axios from "../lib/axios";
import { DorayakiRequestStatus } from "../utils/enum";
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

export const updateRequest = async (payload: {
  dorayakirequest_id: number,
  status: DorayakiRequestStatus
}) => {
  const url = `/dorayaki-request/${payload.dorayakirequest_id}`;
  try {
    const res = await axios.put(url, {
      status: payload.status
    });
    return res.data.data;
  } catch (err: any) {
    return err.response.data.message;
  }
};
