import { Date } from "isoly"
import { Workchunk } from "./Workchunk"

export interface Workload {
	ok: true
	result: {
		userId: string
		name: string
		records: Workchunk[]
		avatar?: string
		active?: boolean
		role?: string
		teamCreateDate?: Date
		lastCheckInDate?: Date
		workdayDuration?: number
	}
}

export namespace Workload {
	export function is(value: any): value is Workload {
		return (
			typeof value == "object" &&
			value &&
			typeof value.ok == "boolean" &&
			typeof value.result == "object" &&
			value.result &&
			Array.isArray(value.result.records) &&
			value.result.records.every(Workchunk.is)
		)
	}
}
