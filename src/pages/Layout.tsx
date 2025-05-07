import React from "react"
import { Outlet } from "react-router"
export default function Index() {
	return (
		<div>
			<h1>Layout</h1>
			<Outlet />
		</div>
	)
}
