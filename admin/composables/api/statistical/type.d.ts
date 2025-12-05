interface StatsConfig {
	key: 'BlogList' | 'RecordList' | 'SuggestionList';
	type: 'BlogList' | 'RecordList' | 'SuggestionList';
	total: number;
	today: number;
}

// 查询博客浏览量参数类型
interface BlogViewsQuery {
	type: 'blog' | 'record';
	year: number;
	month: number;
}
