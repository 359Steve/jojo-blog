enum TagType {
	BLOG = '博客',
	PERSON = '个人',
}

interface FindAllReq {
	name: string;
	pageNumber: number;
	pageSize: number;
}

interface FindReq {
	type: keyof typeof TagType;
}
