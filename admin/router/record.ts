export default {
	path: '/admin/record',
	meta: {
		title: '履历管理',
		icon: 'tabler:clock-record',
		rank: 3
	},
	redirect: '/admin/record/group',
	children: [
		{
			path: '/admin/record/group',
			name: 'RecordGroup',
			meta: {
				title: '分组管理',
				icon: 'tabler:calendar-time'
			}
		},
		{
			path: '/admin/record/article',
			name: 'RecordArticle',
			meta: {
				title: '文章管理',
				icon: 'tabler:file-text'
			}
		}
	]
} satisfies RouteConfigsTable;
