import * as gracely from "gracely"
import * as isoly from "isoly"
import * as http from "cloudly-http"
import * as model from "./model"
import { router } from "./router"

async function get(request: http.Request) {
	let result: gracely.Error | any
	console.log(JSON.stringify(request), "🔥")
	const authorization = request.header.authorization
	const start = request.search.start
	const end = request.search.end
	const user = request.parameter.user
	if (typeof authorization != "string")
		result = gracely.client.missingHeader("Authorization", "Authorization header must be set to bearer token.")
	else if (!isoly.Date.is(start))
		result = gracely.client.invalidQueryArgument("start", "isoly.Date", "start must be date, e.g. YYYY-MM-DD")
	else if (!isoly.Date.is(end))
		result = gracely.client.invalidQueryArgument("end", "isoly.Date", "start must be date, e.g. YYYY-MM-DD")
	else if (typeof user != "string")
		result = gracely.client.invalidPathArgument("/surplus/:user", "user", "string", "user must be set")
	else
		result = await model.getSurplus(start, end, user, authorization)
	return result
}

router.add("GET", "/surplus/:user", get)
