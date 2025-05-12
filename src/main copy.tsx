import React from "react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { HashRouter, Route, Routes, useRoutes } from "react-router"

createRoot(document.getElementById("root")).render(
	<HashRouter>
		<App></App>
	</HashRouter>
)
