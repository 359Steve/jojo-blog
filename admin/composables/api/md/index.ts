// 上传md图片
export const mdUploadImage = async (value: FormData) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<FormData, MdUploadImageResponse>('/md/mdUpload', {
			body: value,
		}),
	);

	return handleApiResponse(res);
};

// 删除指定目录下的图片
export const mdDeleteImageDir = async (query: MdDeleteImageDirRequest) => {
	const res = await jojoLoadingIndicator(() =>
		fetchDeleteApi<MdDeleteImageDirRequest, MdDeleteImageDirResponse>('/md/mdDelPic', {
			query,
		}),
	);

	return handleApiResponse(res);
};
