import axios from "axios";
import { env } from "@/env";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

const axiosClient = axios.create({
    baseURL: env.API_BASE_URL,
});

axiosClient.interceptors.request.use(async (config) => {
    const session = window ? await getSession() : await auth();
    if (session) {
        config.headers.Authorization = `Bearer ${session.user.access}`;
    }

    return config;
});

export { axiosClient };
