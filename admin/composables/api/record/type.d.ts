type GroupWithDetail<T> = T & {
	group: {
		time_range: string;
	};
};
