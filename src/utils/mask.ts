import { PatternFormatProps } from "react-number-format";

export const PROCESS_ID_MASK: PatternFormatProps = {
	format: "XXXXXXX-XX.XXXX.X.XX.XXXX",
	allowEmptyFormatting: true,
	mask: "_",
	patternChar: "X",
};
