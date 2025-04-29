import { writeFile } from 'fs/promises'
import { join } from 'path'

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