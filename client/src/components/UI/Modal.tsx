import { HiX } from "react-icons/hi";
import styled from "styled-components";

interface IModalProps {
	children?: React.ReactNode;
	isActive: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	onClose?: () => void;
}

interface IStyledModalProps {
	isActive: boolean;
}

const StyledModal = styled.div<IStyledModalProps>`
	visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 50;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.6);
	transition: visibility 400ms linear;

	.box {
		position: relative;
		min-width: 450px;
		min-height: 250px;
		padding: 48px 30px 30px 30px;
		border-radius: 15px;
		transform: ${({ isActive }) =>
			isActive ? "translateY(0)" : "translateY(50px)"};
		opacity: ${({ isActive }) => (isActive ? "1" : "0")};
		background-color: #222531;
		transition: transform 400ms ease-out, opacity 500ms ease-out;
	}

	.close-btn {
		position: absolute;
		top: 18px;
		right: 18px;
		cursor: pointer;
	}
`;

const Modal = ({
	children,
	isActive,
	setIsActive,
	onClose = () => {},
}: IModalProps) => {
	if (isActive) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "auto";
	}

	return (
		<StyledModal isActive={isActive}>
			<div className="box">
				<HiX
					className="close-btn"
					size="25"
					color="#a6b0c3"
					onClick={() => {
						setIsActive(false);
						onClose();
					}}
				/>
				<div className="content">{children}</div>
			</div>
		</StyledModal>
	);
};

export default Modal;
