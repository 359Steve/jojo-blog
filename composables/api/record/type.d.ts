type RecordWithDetailsRep<T, K> = T & {
	prev: { id: number } | null;
	next: { id: number } | null;
	details: Pick<K, 'id' | 'title' | 'images' | 'image_alt' | 'time_range'>[];
	_count: {
		details: number;
	};
};

type RecordDetailRep<T> = T & {
	imageAll: Pick<T, 'id' | 'images' | 'image_alt'>[];
	prev: { id: number } | null;
	next: { id: number } | null;
};

// 分页查询记录参数类型
type RecordQueryParams = {
	parentId: number;
	pageNumber: number;
	pageSize: number;
};
