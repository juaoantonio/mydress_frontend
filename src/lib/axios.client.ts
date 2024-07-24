import axios from "axios";
import { env } from "@/env";
import { getSession } from "next-auth/react";

export const client = axios
  .create({
    baseURL: env.API_BASE_URL,
  })
  .interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session.user.access}`;
    }

    return config;
  });
