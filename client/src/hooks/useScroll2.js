import { useEffect, useRef } from "react";

export const useScroll = (ancestorRef, descendantRef, callback) => {
	const observer = useRef(null);

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

		const myRef = descendantRef.current;
		observer.current.observe(myRef);

		return function () {
			console.log("unobserve");
			observer.current.unobserve(myRef);
		};
	}, [ancestorRef, descendantRef, callback]);
};
