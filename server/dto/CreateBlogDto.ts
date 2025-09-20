export class CreateBlogDto {
	id?: number;
	title!: string;
	subtitle!: string;
	content!: string;
	created_at!: string;
	updated_at!: string;
}
