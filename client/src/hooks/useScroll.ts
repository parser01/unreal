import { useEffect, useRef } from "react";

export const useScroll = (
	ancestorRef: React.RefObject<HTMLElement> | null,
	descendantRef: React.RefObject<HTMLElement>,
	callback: () => void
) => {
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		console.log("useEffect");

		let options = {
			root: null,
			rootMargin: "0px",
			threshold: 0,
		};

		observer.current = new IntersectionObserver(([target]) => {
			console.log("isInter");
			if (target.isIntersecting) {
				console.log("intersect");
				callback();
			}
		}, options);

		let myRef: Element;

		if (descendantRef.current) {
			myRef = descendantRef.current;
			observer.current.observe(myRef);
		}

		return function () {
			console.log("unobserve");
			if (observer.current) {
				observer.current.unobserve(myRef);
			}
		};
	}, [ancestorRef, descendantRef, callback]);
};
