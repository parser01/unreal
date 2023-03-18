import styled, { css, keyframes } from "styled-components";

interface ILoaderProps {
	color?: string;
	size?: string;
	width?: string;
}

const loader = keyframes`
   0% {
     transform: rotate(0deg);
   }

   100% {
     transform: rotate(360deg);
   }
`;

const StyledLoader = styled.div.attrs(
	({ color, size, width }: ILoaderProps) => ({
		color: color || "#fff ",
		size: size || "64px",
		width: width || "8px",
	})
)`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;

	div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: ${({ size }) => size};
		height: ${({ size }) => size};
		margin: 8px;
		border: ${({ width, color }) => `${width} solid ${color}`};
		border-radius: 50%;
		animation: ${loader} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: ${({ color }) =>
			`${color} transparent transparent transparent`};
	}

	div:nth-child(1) {
		animation-delay: -0.45s;
	}

	div:nth-child(2) {
		animation-delay: -0.3s;
	}

	div:nth-child(3) {
		animation-delay: -0.15s;
	}
`;

const Loader = (props: ILoaderProps): JSX.Element => {
	return (
		<StyledLoader {...props}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</StyledLoader>
	);
};

export default Loader;
