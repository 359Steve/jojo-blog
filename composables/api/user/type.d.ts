interface FindPictureRequest {
	pageNumber: number;
	pageSize: number;
	random?: boolean;
}

type HomePicResponse<T> = T & {
	group_id: number;
};
