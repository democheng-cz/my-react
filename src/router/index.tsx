import React from "react"
import type { RouteObject } from "react-router"
import Layout from "@/pages/Layout"
import Holiday from "@/pages/holiday"
import ShiftTable from "@/pages/shift/ShiftTable"

const router: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/holiday",
				element: <Holiday />,
			},
			{
				path: "/shift",
				element: <ShiftTable />,
			},
		],
	},
]
export default router
