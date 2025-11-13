interface FindPictureRequest {
	pageNumber: number;
	pageSize: number;
	random?: boolean;
}

interface HomePicResponse<T> extends Pick<T, 'id' | 'image_url' | 'image_alt'> {
	parent_id: number;
}
