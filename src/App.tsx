import { useEffect } from "react"
import { useRoutes, useLocation, useNavigate } from "react-router"
import router from "@/router/index"

function App() {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		if (pathname === "/") {
			navigate("/shift")
		}
	})
	return <>{useRoutes(router)}</>
}

export default App
