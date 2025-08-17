import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cloud.abhipraya.dev",
			},
		],
	},
};

export default nextConfig;
