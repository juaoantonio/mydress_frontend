import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    const environment = process.env.NODE_ENV;
    return {
        name: "My Dress Pro Suite - Sistema de Gerencimento de Aluguel de Vestidos",
        short_name: `My Dress${environment !== "production" ? "" : " - Dev"}`,
        description: "Sistema de Gerencimento de Aluguel de Vestidos",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
            {
                src: "/web-app-manifest-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/web-app-manifest-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}
