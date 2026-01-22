type Details<T, K extends keyof T> = Pick<T, K> & {
	images: {
		url: string;
		blurhash: string;
		is_live: boolean;
	}[];
};

type RecordWithDetailsRep<T, K> = T & {
	prev: { id: number } | null;
	next: { id: number } | null;
	details: Details<K, 'id' | 'title' | 'image_alt' | 'time_range' | 'views'>[];
	_count: {
		details: number;
	};
};

type RecordDetailRep<T> = Omit<T, 'images'> & {
	images: {
		url: string;
		blurhash: string;
		is_live: boolean;
	}[];
} & {
	imageAll: Details<T, 'id' | 'images' | 'image_alt'>[];
	prev: { id: number } | null;
	next: { id: number } | null;
};
