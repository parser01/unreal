import { useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import styled from "styled-components";
import { IFormValues } from "../../types/form";

interface IInputProps {
	className?: string;
	label: string;
	type?: string;
	placeholder?: string;
	name: Path<IFormValues>;
	register: UseFormRegister<IFormValues>;
	required?: boolean | string;
	pattern?: RegExp | { value: RegExp; message: string };
	minLength?: number | { value: number; message: string };
	maxLength?: number | { value: number; message: string };
}

const StyledInput = styled.div`
	display: flex;
	flex-direction: column;

	label {
		margin-bottom: 6px;
		cursor: text;
		color: #fff;
		font-weight: 600;
		font-size: 12px;
		line-height: 1.5;
		letter-spacing: 1px;
	}

	input {
		width: 100%;
		height: 56px;
		padding: 0 18px;
		border: 1px solid #40424e;
		border-radius: 8px;
		background-color: #171924;
		color: #fff;
		font-size: 14px;
		letter-spacing: 1px;

		&:hover {
			border-color: #3861fb;
		}

		&:focus {
			border-color: #3861fb;
			box-shadow: 0 0 0 4px rgb(56, 97, 251, 0.3);
		}
	}

	.password-input {
		display: flex;
		align-items: center;
		height: 56px;
		padding-right: 18px;
		border: 1px solid #40424e;
		border-radius: 8px;
		cursor: text;
		background-color: #171924;

		&:hover {
			border-color: #3861fb;
		}

		&:focus-within {
			border-color: #3861fb;
			box-shadow: 0 0 0 4px rgb(56, 97, 251, 0.3);
		}

		input {
			height: 100%;
			margin: 0;
			border: none;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
			box-shadow: none;
		}
	}

	.eye-btn {
		cursor: pointer;
	}
`;

const Input = ({
	className,
	label,
	type = "text",
	placeholder,
	name,
	register,
	required,
	pattern,
	minLength,
	maxLength,
}: IInputProps) => {
	const [passwordIsVisible, setPasswordIsVisible] = useState(false);

	const togglePasswordVisibility: React.MouseEventHandler<SVGElement> = (
		e
	) => {
		setPasswordIsVisible((actual) => !actual);
	};

	const preventSelecting: React.MouseEventHandler<SVGElement> = (event) => {
		if (event.detail === 2) {
			event.preventDefault();
			// of course, you still do not know what you prevent here...
			// You could also check event.ctrlKey/event.shiftKey/event.altKey
			// to not prevent something useful.
		}
	};

	return (
		<StyledInput className={className}>
			<label htmlFor="">{label}</label>
			{type === "password" ? (
				<div className="password-input">
					<input
						type={passwordIsVisible ? "text" : "password"}
						placeholder={placeholder}
						{...register(name, {
							required,
							pattern,
							minLength,
							maxLength,
						})}
					/>
					{passwordIsVisible ? (
						<HiEyeOff
							className="eye-btn"
							size="25"
							color="#636c7f"
							onClick={togglePasswordVisibility}
							onMouseDown={preventSelecting}
						/>
					) : (
						<HiEye
							className="eye-btn"
							size="25"
							color="#636c7f"
							onClick={togglePasswordVisibility}
							onMouseDown={preventSelecting}
						/>
					)}
				</div>
			) : (
				<input
					type={type}
					placeholder={placeholder}
					{...register(name, { required, pattern, minLength, maxLength })}
				/>
			)}
		</StyledInput>
	);
};

export default Input;
