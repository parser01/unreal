import { useState } from "react";
import { HiChevronUp } from "react-icons/hi";
import styled from "styled-components";

interface ScrollToTopProps {
	smooth?: boolean;
}

const StyledScrollToTop = styled.button.attrs({
	type: "button",
	"aria-label": "scroll to top",
})`
	position: fixed;
	bottom: 67px;
	right: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 48px;
	height: 48px;
	border: 1px solid transparent;
	border-radius: 3px;
	background-color: #3861fb;
	transition: border 0.3s, background-color 0.3s;

	&:hover {
		border: 1px solid #3861fb;
		background-color: #000;
	}
`;

const ScrollToTop = ({ smooth = false }: ScrollToTopProps): JSX.Element => {
	const [visible, setIsVisible] = useState(false);

	const toggleIsVisible = () => {
		if (window.pageYOffset >= 20) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	window.addEventListener("scroll", toggleIsVisible);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: smooth ? "smooth" : "auto",
		});
	};

	return visible ? (
		<StyledScrollToTop onClick={scrollToTop}>
			<HiChevronUp size="32" color="#fff" />
		</StyledScrollToTop>
	) : (
		<></>
	);
};

export default ScrollToTop;
