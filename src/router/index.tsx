import React from "react"
import type { RouteObject } from "react-router"
import Layout from "@/pages/Layout"
import Holiday from "@/pages/holiday"

const router: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/holiday",
				element: <Holiday />,
			},
		],
	},
]
export default router
