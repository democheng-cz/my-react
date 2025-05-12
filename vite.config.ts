import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: true, // 监听所有地址
		allowedHosts: true, // 允许所有主机访问
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})
