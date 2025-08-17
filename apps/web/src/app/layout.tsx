"use client";

// Metadata removed - now handled via head tag in HTML
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";
import { useEffect } from "react";
import { Events, scrollSpy, animateScroll as scroll } from "react-scroll";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// Note: metadata moved to separate metadata.ts file for client component compatibility

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Set up react-scroll events and configuration
	useEffect(() => {
		// Register scroll events for debugging and tracking
		Events.scrollEvent.register("begin", (to: string, element: Element) => {
			console.log("Scroll begin:", to, element);
		});

		Events.scrollEvent.register("end", (to: string, element: Element) => {
			console.log("Scroll end:", to, element);
		});

		// Update scrollSpy to detect scroll positions
		scrollSpy.update();

		// Cleanup function to remove events when component unmounts
		return () => {
			Events.scrollEvent.remove("begin");
			Events.scrollEvent.remove("end");
		};
	}, []);

	// Global scroll utilities that can be called from anywhere
	const scrollToTop = () => {
		scroll.scrollToTop({
			duration: 500,
			smooth: "easeInOutQuart",
			containerId: "app-container",
		});
	};

	const scrollToBottom = () => {
		scroll.scrollToBottom({
			duration: 500,
			smooth: "easeInOutQuart",
			containerId: "app-container",
		});
	};

	// Attach scroll utilities to window for global access
	useEffect(() => {
		// Type-safe window extension with unique method names
		interface WindowWithScrollUtils extends Window {
			smoothScrollToTop: () => void;
			smoothScrollToBottom: () => void;
			smoothScrollToPosition: (position: number) => void;
		}

		const windowWithScrollUtils = window as unknown as WindowWithScrollUtils;
		windowWithScrollUtils.smoothScrollToTop = scrollToTop;
		windowWithScrollUtils.smoothScrollToBottom = scrollToBottom;
		windowWithScrollUtils.smoothScrollToPosition = (position: number) => {
			scroll.scrollTo(position, {
				duration: 500,
				smooth: "easeInOutQuart",
				containerId: "app-container",
			});
		};
	}, []);

	return (
		<html lang="en">
			<head>
				<title>[App Name]</title>
				<meta name="description" content="[App Desc]" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<div className="flex h-screen w-screen items-center justify-center bg-gray-300">
						<div
							id="app-container"
							className="relative h-full max-h-[888px] w-full max-w-[450px] overflow-y-auto overflow-x-hidden shadow-2xl scroll-smooth"
							style={{ scrollBehavior: "smooth" }}
						>
							{children}
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
