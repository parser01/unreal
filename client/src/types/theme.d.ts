import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		headerBg: string;
		mainBg: string;
		fontColor: string;
		buttonBg: string;
		buttonColor: string;
		iconColor: string;
	}
}
