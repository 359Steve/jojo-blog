import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler( async (event) => {
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