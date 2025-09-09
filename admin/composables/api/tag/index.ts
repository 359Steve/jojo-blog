import type { CreateTagDto } from "~/server/dto/CreateTagDto"
import { StatusCode } from "~/types/com-types"

// 查询全部标签
export const queryTagAll = async (name: string, n: number = 1, s: number = 10) => {
	const res = await fetchUseGet<FindAllReq, { records: CreateTagDto[], total: number }>('/tag/tagQueryAll', {
		query: {
			name,
			pageNumber: n,
			pageSize: s
		}
	})

	if (res.code === StatusCode.SUCCESS) {
		return {
			records: res.data.records,
			total: res.data.total
		}
	}

	return {
		records: [],
		total: 0
	}
}

// 创建标签
export const createTags = async (value: CreateTagDto) => {
	const res = await fetchPostApi<CreateTagDto, CreateTagDto>('/tag/tagCreate', {
		body: value
	})

	if (res.code === StatusCode.SUCCESS) {
		return {
			data: res.data,
			msg: res.msg
		}
	}

	return {
		data: null,
		msg: res.msg
	}
}

// 修改标签
export const updateTags = async (value: CreateTagDto) => {
	const res = await fetchPostApi<CreateTagDto, CreateTagDto>('/tag/tagUpdate', {
		body: value
	})

	if (res.code === StatusCode.SUCCESS) {
		return {
			data: res.data,
			msg: res.msg
		}
	}

	return {
		data: null,
		msg: res.msg
	}
}

// 删除标签
export const deleteTags = async (id: number) => {
	const res = await fetchDeleteApi<{ id: number }, CreateTagDto>('/tag/tagDelete', {
		query: {
			id
		}
	})

	if (res.code === StatusCode.SUCCESS) {
		return {
			data: res.data,
			msg: res.msg
		}
	}

	return {
		data: null,
		msg: res.msg
	}
}
