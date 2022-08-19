import { divideTimeRange, Workload } from "./index"

describe("model", () => {
	it("divideTimeSpan", () => {
		expect(divideTimeRange("2022-01-01", "2022-05-01")).toEqual([{ start: "2022-01-01", end: "2022-05-01" }])
		expect(divideTimeRange("2021-01-01", "2022-05-01")).toEqual([
			{ start: "2021-01-01", end: "2021-12-31" },
			{ start: "2022-01-01", end: "2022-05-01" },
		])
		expect(divideTimeRange("2021-01-01", "2024-05-01")).toEqual([
			{ start: "2021-01-01", end: "2021-12-31" },
			{ start: "2022-01-01", end: "2022-12-31" },
			{ start: "2023-01-01", end: "2023-12-31" },
			{ start: "2024-01-01", end: "2024-05-01" },
		])
		expect(divideTimeRange("2021-03-01", "2022-03-01")).toEqual([{ start: "2021-03-01", end: "2022-03-01" }])
		expect(divideTimeRange("2021-03-01", "2022-03-02")).toEqual([
			{ start: "2021-03-01", end: "2022-02-28" },
			{ start: "2022-03-01", end: "2022-03-02" },
		])
	})
	it("Workload.is", () => {
		const workload: Workload = {
			ok: true,
			result: {
				userId: "U01RXNJ3BPS",
				name: "Magnus Gustafsson",
				avatar: "https://avatars.slack-edge.com/2021-05-06/2043254774532_1eddf504958f377a891e_192.jpg",
				active: true,
				records: [
					{
						date: "2022-06-17",
						hours: 7,
						project_id: "600f0587ff5cb800046324a1",
						info: "",
						edited: {
							userId: "",
							name: "",
							avatar: "",
						},
						order: 0,
					},
					{
						date: "2022-06-15",
						hours: 6.25,
						project_id: "600f0655ff5cb800046324a2",
						is_day_off: false,
						info: "",
						edited: {
							userId: "",
							name: "",
							avatar: "",
						},
						order: 0,
					},
					{
						date: "2022-06-15",
						hours: 3,
						project_id: "600f02dbff5cb80004632498",
						is_day_off: false,
						info: "",
						edited: {
							userId: "",
							name: "",
							avatar: "",
						},
						order: 0,
					},
					{
						date: "2022-06-16",
						hours: 1,
						project_id: "600f02dbff5cb80004632498",
						is_day_off: false,
						info: "",
						edited: {
							userId: "",
							name: "",
							avatar: "",
						},
						order: 0,
					},
					{
						date: "2022-06-16",
						hours: 7.25,
						project_id: "600f0587ff5cb800046324a1",
						is_day_off: false,
						info: "",
						edited: {
							userId: "",
							name: "",
							avatar: "",
						},
						order: 1,
					},
				],
				role: "developer",
				teamCreateDate: "2021-01-25",
				lastCheckInDate: "2022-08-19",
				workdayDuration: 8,
			},
		}
		expect(Workload.is(workload)).toBeTruthy()
	})
})
