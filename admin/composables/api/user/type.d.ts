interface UploadAvatarRep {
	url: string;
}

interface UserTags<T> {
	user_id: number;
	tag_id: number;
	tag: T;
}

type UserInfoDetail<T, U> = T & { tags: U };
