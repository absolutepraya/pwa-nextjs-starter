import { animateScroll as scroll, scroller } from "react-scroll";

// Default scroll options for consistent behavior
export const defaultScrollOptions = {
	duration: 500,
	smooth: "easeInOutQuart" as const,
	containerId: "app-container",
};

// Scroll utility functions
export const scrollUtils = {
	// Scroll to top of container
	scrollToTop: (options = {}) => {
		scroll.scrollToTop({
			...defaultScrollOptions,
			...options,
		});
	},

	// Scroll to bottom of container
	scrollToBottom: (options = {}) => {
		scroll.scrollToBottom({
			...defaultScrollOptions,
			...options,
		});
	},

	// Scroll to specific position (in pixels)
	scrollToPosition: (position: number, options = {}) => {
		scroll.scrollTo(position, {
			...defaultScrollOptions,
			...options,
		});
	},

	// Scroll to a specific element by name
	scrollToElement: (elementName: string, options = {}) => {
		scroller.scrollTo(elementName, {
			...defaultScrollOptions,
			...options,
		});
	},

	// Scroll more (relative to current position)
	scrollMore: (amount: number, options = {}) => {
		scroll.scrollMore(amount, {
			...defaultScrollOptions,
			...options,
		});
	},

	// Get current scroll position
	getCurrentPosition: () => {
		const container = document.getElementById("app-container");
		return container ? container.scrollTop : 0;
	},

	// Check if element is in view
	isElementInView: (elementName: string) => {
		const container = document.getElementById("app-container");
		const element = document.querySelector(`[name="${elementName}"]`);

		if (!container || !element) return false;

		const containerRect = container.getBoundingClientRect();
		const elementRect = element.getBoundingClientRect();

		return (
			elementRect.top >= containerRect.top &&
			elementRect.bottom <= containerRect.bottom
		);
	},
};

// Export individual functions for convenience
export const {
	scrollToTop,
	scrollToBottom,
	scrollToPosition,
	scrollToElement,
	scrollMore,
	getCurrentPosition,
	isElementInView,
} = scrollUtils;

// Export types for better TypeScript support
export type ScrollOptions = {
	duration?: number;
	smooth?: string | boolean;
	offset?: number;
	delay?: number;
	isDynamic?: boolean;
	containerId?: string;
};

// Hook for pages to use scroll functionality
export const useScrollUtils = () => {
	return scrollUtils;
};
