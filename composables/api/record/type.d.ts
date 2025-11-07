type RecordWithDetailsRep<T, K> = T & {
	details: Pick<K, 'id' | 'title' | 'image_url' | 'image_alt'>[];
};

type RecordDetailRep<T> = T & {
	imageAll: Pick<T, 'id' | 'image_url' | 'image_alt'>[];
	prev: { id: number } | null;
	next: { id: number } | null;
};
