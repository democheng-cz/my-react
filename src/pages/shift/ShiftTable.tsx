import React, { useState } from "react"
import {
	Table,
	DatePicker,
	Card,
	Typography,
	Space,
	Row,
	Col,
	InputNumber,
	Button,
	Affix,
} from "antd"
import type { ColumnsType } from "antd/es/table"
import { ShiftCalculator } from "@/utils/ShiftCalculator"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import zhCN from "antd/locale/zh_CN"
import styled from "styled-components"

// 设置 dayjs 语言为中文
dayjs.locale("zh-cn")

const { Title } = Typography

const StyledCard = styled(Card)`
	margin: 16px;
	.ant-card-body {
		padding: 16px;
	}
	@media (max-width: 768px) {
		margin: 8px;
		.ant-card-body {
			padding: 8px;
		}
	}
`

const StyledTable = styled(Table<ShiftResult>)`
	.weekend-row {
		background-color: #fff1f0;
	}
	@media (max-width: 768px) {
		.ant-table-cell {
			padding: 8px 4px;
			font-size: 12px;
		}
	}
`

const ControlWrapper = styled.div`
	background: #fff;
	padding: 16px;
	@media (max-width: 768px) {
		padding: 8px;
		.ant-space {
			flex-direction: column;
			width: 100%;
			gap: 8px !important;
		}
		.ant-space-item {
			width: 100%;
		}
		.ant-picker {
			width: 100%;
		}
		.ant-input-number {
			width: 100%;
		}
		.ant-btn {
			width: 100%;
		}
	}
`

interface ShiftResult {
	cycle: number
	workPeriod: string
	restPeriod: string
	restDays: string[]
	weekendOverlap: number
	isFullWeekend: boolean
}

const ShiftTable: React.FC = () => {
	const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
	const [data, setData] = useState<ShiftResult[]>([])
	const [cyclesToCheck, setCyclesToCheck] = useState<number | null>(null)

	const calculator = new ShiftCalculator()

	const handleDateChange = (date: dayjs.Dayjs | null) => {
		setStartDate(date)
	}

	const handleCalculate = () => {
		if (cyclesToCheck === null || startDate === null) {
			return
		}
		const results = calculator.calculateOverlap(
			startDate.format("YYYY-MM-DD"),
			cyclesToCheck
		)
		setData(results)
	}

	const columns: ColumnsType<ShiftResult> = [
		{
			title: "周期",
			dataIndex: "cycle",
			key: "cycle",
			width: 60,
			fixed: "left",
		},
		{
			title: "工作期间",
			dataIndex: "workPeriod",
			key: "workPeriod",
			width: 180,
			responsive: ["md"],
		},
		{
			title: "休息期间",
			dataIndex: "restPeriod",
			key: "restPeriod",
			width: 180,
			responsive: ["md"],
		},
		{
			title: "休息日",
			dataIndex: "restDays",
			key: "restDays",
			render: (restDays: string[]) => restDays.join(", "),
			ellipsis: true,
		},
	]

	const onRow = (record: ShiftResult) => ({
		className: record.isFullWeekend ? "weekend-row" : "",
	})

	return (
		<>
			<Affix offsetTop={0}>
				<ControlWrapper>
					<Row justify="space-between" align="middle">
						<Col xs={24} md={12}>
							<Title level={4}>排班日期表</Title>
						</Col>
						<Col xs={24} md={12}>
							<Space>
								<DatePicker
									value={startDate}
									onChange={handleDateChange}
									allowClear={false}
									placeholder="选择开始日期"
									locale={zhCN.DatePicker}
								/>
								<InputNumber
									min={1}
									max={1000}
									value={cyclesToCheck}
									onChange={value => setCyclesToCheck(value)}
									style={{ width: 100 }}
									placeholder="计算周期"
								/>
								<Button
									type="primary"
									onClick={handleCalculate}
									disabled={cyclesToCheck === null || startDate === null}
								>
									计算
								</Button>
							</Space>
						</Col>
					</Row>
				</ControlWrapper>
			</Affix>
			<StyledCard>
				<StyledTable
					columns={columns}
					dataSource={data}
					rowKey="cycle"
					scroll={{ x: "max-content" }}
					pagination={false}
					onRow={onRow}
					size="middle"
				/>
			</StyledCard>
		</>
	)
}

export default ShiftTable
