// 上传md图片
export const mdUploadImage = async (value: FormData) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<FormData, MdUploadImageResponse>('/md/mdUpload', {
			body: value,
		}),
	);

	return handleApiResponse(res);
};
