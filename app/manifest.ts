import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mini Story App",
    short_name: "MiniStory",
    description:
      "Mini Story App is a simple and easy-to-use audio player app tailored for Effortless English Learners taught by A.J. Hoge.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#09090b",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/logo-ministoryappx192.maskable.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/logo-ministoryappx512.maskable.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
