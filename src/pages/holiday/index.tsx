import { useState, useEffect } from "react"

import { ShiftCalculator } from "@/utils/ShiftCalculator"

const shiftCalculator = new ShiftCalculator()
function Holiday() {
	const [schedule, setSchedule] = useState([])

	const [startTime, setStartTime] = useState("")

	// 要计算的周期数
	const [cyclesToCheck, setCyclesToCheck] = useState(10)
	// 校验整数数字输入
	const handleCyclesToCheckChange = (e: any) => {
		const value = e.target.value
		if (!isNaN(value)) {
			setCyclesToCheck(Number(value))
		}
	}

	// 选择开始日期
	const handleStartDateChange = e => {
		const newDate = e.target.value
		setStartTime(newDate)
	}

	useEffect(() => {
		// 初始化排班数据
		setSchedule([])
	}, [])

	// 开始计算
	const handleComputedResult = () => {
		if (!startTime || !cyclesToCheck) {
		}
		const result = shiftCalculator.calculateOverlap(startTime, cyclesToCheck)
	}

	return (
		<>
			<div></div>
		</>
	)
}

export default Holiday
