import React from "react"
import { useRoutes, useLocation, useNavigate } from "react-router"
import router from "@/router"

function App() {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	if (pathname === "/") {
		navigate("/holiday")
	}
	return <>{useRoutes(router)}</>
}

export default App
