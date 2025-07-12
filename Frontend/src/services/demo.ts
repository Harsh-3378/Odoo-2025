// src/api/authApi.ts

import API_URLS from '@/api/apiUrls';
import axiosClient from '@/api/axiosClient';
import { AxiosResponse } from 'axios';

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
}

export const GetAllSlots = async (): Promise<AxiosResponse<ApiResponse>> => {
  return await axiosClient.get(API_URLS.slot.getAllSlots);
};
export const SlotGeneratorFn = async (data: object): Promise<AxiosResponse<ApiResponse>> => {
  return await axiosClient.post(API_URLS.slot.slotGenerator, data);
};

export const TimeTableSlotPreview = async (id: string): Promise<AxiosResponse<ApiResponse>> => {
  return await axiosClient.get(API_URLS.slot.slotPreview, {
    params: { id },
  });
};
