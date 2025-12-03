import type { PrismaClient } from '@prisma/client';
import { prisma } from '../core/prisma';
import type { CreateErrorMessageDto } from '../dto/CreateErrorMessageDto';
import nodemailer from 'nodemailer';
import { StatusCode } from '~/types/com-types';

export class ErrorRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	// 发送错误邮件
	async sendErrorEmail(errorInfo: CreateErrorMessageDto) {
		try {
			const nuxtConfig = useRuntimeConfig();
			const { email } = nuxtConfig.public;

			const transporter = nodemailer.createTransport({
				host: 'smtp.qq.com',
				port: email.port || 465,
				secure: email.secure ?? true,
				auth: {
					user: email.auth.user,
					pass: email.auth.pass,
				},
			});

			const mailOptions = {
				from: `"Jojo Blog 用户反馈" <${email.auth.user}>`,
				to: email.auth.user,
				subject: `📮 [Jojo Blog] 用户反馈 - ${errorInfo.name} - ${new Date().toLocaleString('zh-CN')}`,
				html: `
					<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
						<h2 style="color: #3498db; border-bottom: 2px solid #3498db; padding-bottom: 10px;">📬 用户反馈信息</h2>
						<div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
							<p><strong>⏰ 反馈时间：</strong> ${new Date().toLocaleString('zh-CN')}</p>
							<p><strong>👤 用户姓名：</strong> ${errorInfo.name}</p>
							<p><strong>📧 用户邮箱：</strong> <a href="mailto:${errorInfo.email}" style="color: #3498db;">${errorInfo.email}</a></p>
						</div>
						<div style="background-color: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 5px; margin: 15px 0;">
							<h3 style="color: #555; margin-top: 0;">💬 反馈内容：</h3>
							<div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; border-radius: 0 5px 5px 0; white-space: pre-wrap; line-height: 1.6;">
								${errorInfo.content}
							</div>
						</div>
						<div style="border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px; color: #666; font-size: 12px;">
							<p>此邮件由 <b>Jojo Blog</b> 系统自动发送，请及时查看用户反馈。</p>
							<p>可直接回复至用户邮箱：<strong>${errorInfo.email}</strong></p>
						</div>
					</div>
				`,
				text: `
					用户反馈信息

					反馈时间: ${new Date().toLocaleString('zh-CN')}
					用户姓名: ${errorInfo.name}
					用户邮箱: ${errorInfo.email}

					反馈内容:
					${errorInfo.content}

					此邮件由 Jojo Blog 系统自动发送，请及时查看用户反馈。
				`,
				replyTo: errorInfo.email,
			};

			const result = await transporter.sendMail(mailOptions);

			if (result.messageId) {
				await this.prismaClient.error_report.create({
					data: {
						name: errorInfo.name,
						email: errorInfo.email,
						content: errorInfo.content,
					},
				});

				return returnData(StatusCode.SUCCESS, '感谢你提供的问题，我会尽快处理', result);
			}
			return returnData(StatusCode.FAIL, '邮件发送失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '邮件发送失败', null);
		}
	}

	// 分页查询错误信息
	async queryErrorList(query: ErrorQueryListParams) {
		try {
			const { pageNumber, pageSize } = query;
			const skip = Number((pageNumber - 1) * pageSize);
			const take = Number(pageSize);

			const [total, records] = await this.prismaClient.$transaction([
				this.prismaClient.error_report.count(),
				this.prismaClient.error_report.findMany({
					skip,
					take,
					orderBy: { created_at: 'desc' },
				}),
			]);

			if (!records || !total) {
				return returnData(StatusCode.SUCCESS, '错误信息到底了', null);
			}

			return returnData(StatusCode.SUCCESS, '错误信息获取成功', {
				records,
				total,
			});
		} catch (error) {
			return returnData(StatusCode.FAIL, '错误信息获取失败', null);
		}
	}

}
