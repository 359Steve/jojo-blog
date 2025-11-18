interface RecordDetailImages {
	id: number;
	url: string;
	record_detail_id: number;
}

type GroupWithDetail<T> = T & {
	group: {
		time_range: string;
	};
	images: RecordDetailImages[];
};
