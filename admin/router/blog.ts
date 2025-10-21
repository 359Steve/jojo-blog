export default {
	path: '/admin/blog',
	meta: {
		title: '博客管理',
		icon: 'tabler:cash-edit',
		rank: 2,
	},
	redirect: '/admin/blog/group',
	children: [
		{
			path: '/admin/blog/add',
			name: 'AddBlog',
			meta: {
				title: '操作博客',
				icon: 'tabler:file-plus',
			},
		},
		{
			path: '/admin/blog/group',
			name: 'BlogArticle',
			meta: {
				title: '管理博客',
				icon: 'tabler:article',
			},
		},
	],
} satisfies RouteConfigsTable;
