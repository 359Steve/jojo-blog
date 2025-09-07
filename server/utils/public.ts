import { StatusCode } from "~/types/com-types";

export const returnData = <T>(code: StatusCode, msg: string, data: T | null): NitroResponse<T> => {
	return { code, msg, data };
};
