import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateUserDto {
	@Transform(({ value }) => Number(value))
	@IsNumber()
	id?: number;

	@IsNotEmpty({ message: '名字不能为空' })
	@Length(2, 10, { message: '名字长度在2到10之间' })
	@Transform(({ value }) => value.trim())
	user_name!: string;

	@IsNotEmpty({ message: '密码不能为空' })
	@Length(6, 20, { message: '密码长度在6到20之间' })
	@Transform(({ value }) => value.trim())
	password!: string;

	@IsNotEmpty({ message: '头像不能为空' })
	@Transform(({ value }) => value.trim())
	avatar_url!: string;

	@IsNotEmpty({ message: '昵称不能为空' })
	@Length(2, 10, { message: '昵称长度在2到10之间' })
	@Transform(({ value }) => value.trim())
	pet_name!: string;

	@IsNotEmpty({ message: '签名不能为空' })
	@Length(2, 20, { message: '签名长度在2到20之间' })
	@Transform(({ value }) => value.trim())
	sign!: string;

	@IsNotEmpty({ message: '描述不能为空' })
	@Length(2, 20, { message: '描述长度在2到20之间' })
	@Transform(({ value }) => value.trim())
	describe!: string;
}
