interface UploadAvatarRep {
	url: string;
}

// 用户标签复合返回值
interface UserWithTagsDto<T> {
	user_id: number;
	tag: T;
	tag_id: number;
}

type UserWithTagsRep<T, P, K> = Omit<T, K> & {
	tags: UserWithTagsDto<P>[];
};
