import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

export default defineEventHandler(async (event) => {
	const { slug } = event.context.params as { slug: string }
	const filePath = join(process.cwd(), 'public/file', `${slug}.md`)
	const content = await readFile(filePath, 'utf-8')
	return {
		code: 200,
		msg: 'ok',
		data: {
			content
		}
	}
})
