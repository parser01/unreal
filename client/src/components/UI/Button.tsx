import styled from "styled-components";

interface IButtonProps {
	/*    className?: string;
   children: React.ReactNode; */
	fullWidth?: boolean;
	bg?: string;
	color?: string;
}

const Button = styled.button.attrs(
	({ fullWidth, bg, color }: IButtonProps) => ({
		fullWidth: fullWidth ?? false,
		bg: bg ?? "#000",
		color: color ?? "#fff",
	})
)`
	width: ${({ fullWidth }) => (fullWidth ? "100%" : undefined)};
	height: 48px;
	padding: 0 16px;
	border: ${({ bg }) =>
		bg === "#000" || bg === "#fff" ? "1px solid #3861fb" : "none"};
	border-radius: 8px;
	cursor: pointer;
	background-color: ${({ bg }) => bg};
	color: ${({ color }) => color};
	font-weight: 600;
	font-size: 16px;
	line-height: 1.5;
`;

export default Button;
