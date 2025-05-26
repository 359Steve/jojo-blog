import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

export default defineEventHandler(async (event) => {
	const { content, name } = await readBody<{ name: string, content: string }>(event)
	const filePath = join(process.cwd(), 'public/file', `${name}.md`)
	const res = await writeFile(filePath, content)
	return {
		code: 200,
		msg: 'ok',
		data: res
	}
})
