import React, { useState, useEffect } from "react"
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	Button,
} from "@mui/material"

import { SendOutlined } from "@mui/icons-material"

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
		setSchedule(result)
	}

	return (
		<div className="mt-10">
			<div className="flex items-center justify-around">
				<TextField
					label="选择开始日期"
					type="datetime-local"
					InputLabelProps={{ shrink: true }}
					onChange={e => handleStartDateChange(e)}
				/>
				<TextField
					label="请输入要计算的周期"
					color="secondary"
					value={cyclesToCheck}
					focused
					onInput={(e: any) => handleCyclesToCheckChange(e)}
				/>
				<Button
					variant="outlined"
					startIcon={<SendOutlined />}
					onClick={handleComputedResult}
				>
					开始计算
				</Button>
			</div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>上班周期日期</TableCell>
							<TableCell>休息时间</TableCell>
							<TableCell>班次</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{schedule.map((row, index) => (
							<TableRow key={index}>
								<TableCell>{row.workPeriod}</TableCell>
								<TableCell>{row.restPeriod}</TableCell>
								<TableCell>{row.cycle}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Holiday
