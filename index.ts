import { Context } from "./Context"
import { Environment } from "./Environment"

import "./surplus"

export default {
	async fetch(request: Request, environment: Environment) {
		return await Context.handle(request, environment)
	},
}
