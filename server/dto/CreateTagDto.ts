import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

enum TagType {
	BLOG,// 博客标签
	PERSON // 个人标签
}

export class CreateTagDto {
	@Transform(({ value }) => Number(value))
	@IsNumber()
	id?: number;

	@IsNotEmpty({ message: '名字不能为空' })
	@Length(2, 50, { message: '名字长度在2到10之间' })
	@Transform(({ value }) => value.trim())
	name!: string;

	@IsNotEmpty({ message: '图标不能为空' })
	@Length(10, 255, { message: '图标class长度在10到255之间' })
	@Transform(({ value }) => value.trim())
	icon!: string;

	@IsNotEmpty({ message: '链接不能为空' })
	@Transform(({ value }) => value.trim())
	url!: string;

	@IsNotEmpty({ message: '类型不能为空' })
	@Transform(({ value }) => value.trim())
	type!: keyof typeof TagType;
}

export interface FindAllReq {
	pageNumber: number;
	pageSize: number;
}
