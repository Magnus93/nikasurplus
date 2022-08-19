import * as isoly from "isoly"

export interface Workchunk {
	date: isoly.Date
	hours: number
	project_id: string
	is_day_off?: boolean
	info?: string
	edited?: any
	order?: number
}

export namespace Workchunk {
	export function is(value: any): value is Workchunk {
		return (
			typeof value == "object" &&
			value &&
			isoly.Date.is(value.date) &&
			typeof value.hours == "number" &&
			typeof value.project_id == "string" &&
			(value.is_day_off == undefined || typeof value.is_day_off == "boolean")
		)
	}
}
