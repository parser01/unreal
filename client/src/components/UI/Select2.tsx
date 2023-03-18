import styled from "styled-components";

interface ISelectProps {
	bg?: string;
	color?: string;
}

const Select = styled("select").attrs(({ bg, color }: ISelectProps) => ({
	bg: bg ?? "#000",
	color: color ?? "#fff",
}))`
	height: 48px;
	padding: 0 3px;
	border: 1px solid #6188ff;
	border-radius: 8px;
	cursor: pointer;
	user-select: none;
	background-color: ${({ bg }) => bg};
	color: ${({ color }) => color};
	font-size: 16px;
	line-height: 1.5;
	letter-spacing: 1px;
`;

export default Select;
