import * as gracely from "gracely"
import { Date, TimeRange } from "isoly"
import * as http from "cloudly-http"
import { Workload } from "./Workload"

export { Workload }

export function divideTimeRange(start: Date, end: Date): TimeRange[] {
	const result = []

	for (let cursor = start; cursor <= end; cursor = end < Date.nextYear(cursor) ? end : Date.nextYear(cursor)) {
		if (cursor == end)
			break
		const next = end <= Date.nextYear(cursor) ? end : Date.previous(Date.nextYear(cursor))
		result.push({ start: cursor, end: next })
	}
	return result
}

export function calcMonthSurplus(workload: Workload, range: TimeRange): Record<string, number> {
	const dayRecord: Record<string, number> = {}
	workload.result.records.forEach(chunk => {
		const date = chunk.date
		dayRecord[date] = (dayRecord[date] ?? 0) + chunk.hours
	})
	const monthSurplus: Record<string, any> = {}
	const end = range.end < Date.now() ? range.end : Date.now()
	for (let cursor = range.start; cursor <= end; cursor = Date.next(cursor)) {
		const month = cursor.substring(0, 7)
		const isWeekend = [0, 6].includes(Date.getWeekDay(cursor))
		const workedHours = dayRecord[cursor] ?? 0
		monthSurplus[month] = (monthSurplus[month] ?? 0) + workedHours - (isWeekend ? 0 : 8)
	}
	return monthSurplus
}

export async function getSingleRangeSurplus(
	start: Date,
	end: Date,
	user: string,
	authorization: string
): Promise<Record<string, number> | gracely.Error> {
	let result: Record<string, number> | gracely.Error = gracely.server.backendFailure("Failed to fetch from nikabot")
	const workload = await (
		await http.fetch({
			url: `https://api.nikabot.com/api/web/user/workload?dateStart=${start.replace(/-/g, "")}&dateEnd=${end.replace(
				/-/g,
				""
			)}&targetUser=${user}`,
			header: { authorization },
		})
	).body
	if (Workload.is(workload))
		result = calcMonthSurplus(workload, { start, end })
	else
		console.log("❗", JSON.stringify(workload), "❗")
	result = gracely.Error.is(result)
		? result
		: { ...result, total: Object.values(result).reduce((total, hours) => total + hours, 0) }
	console.log(JSON.stringify(result))
	return result
}

export async function getSurplus(
	start: Date,
	end: Date,
	user: string,
	authorization: string
): Promise<Record<string, number> | gracely.Error> {
	const result: Record<string, number> = {}
	const ranges = divideTimeRange(start, end)
	console.log("ranges:", JSON.stringify(ranges, undefined, 2))
	let error: gracely.Error | undefined
	for (const range of ranges) {
		const single = await getSingleRangeSurplus(range.start, range.end, user, authorization)
		if (gracely.Error.is(single))
			error = single
		else
			Object.entries(single).forEach(([month, hours]) => {
				result[month] = (result[month] ?? 0) + hours
			})
	}
	return error ?? result
}
