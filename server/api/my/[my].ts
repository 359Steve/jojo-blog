import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

export default defineEventHandler(async (event) => {
	const { my } = event.context.params as { my: string }
	const filePath = join(process.cwd(), 'public/file', `${my}.txt`)
	const content = await readFile(filePath, 'utf-8')
	return {
		code: 200,
		msg: 'ok',
		data: {
			content
		}
	}
})
