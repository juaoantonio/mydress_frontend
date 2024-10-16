import axios from "axios";
import { env } from "@/env";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { isServer } from "@/lib/utils";

const axiosClient = axios.create({
    baseURL: env.API_BASE_URL,
});

axiosClient.interceptors.request.use(async (config) => {
    const session = isServer() ? await auth() : await getSession();
    if (session) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
});

export { axiosClient };
