import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "[App Name]",
	description: "[App Desc]",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<div className="flex h-screen w-screen items-center justify-center bg-gray-300">
						<div className="relative h-full max-h-[888px] w-full max-w-[450px] overflow-hidden shadow-2xl">
							{children}
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
