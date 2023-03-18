import styled from "styled-components";

const StyledFooter = styled.div`
	padding: 30px 0;
	text-align: center;
	background-color: #17171a;
	color: #fff;
	letter-spacing: 1px;
	font-size: 14px;
`;

const Footer = () => {
	return (
		<StyledFooter>
			&copy; {new Date().getFullYear()} Unreal. All rights reserved
		</StyledFooter>
	);
};

export default Footer;
