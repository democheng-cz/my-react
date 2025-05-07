interface ShiftResult {
	cycle: number
	workPeriod: string
	restPeriod: string
	restDays: string[]
	weekendOverlap: number
	isFullWeekend: boolean
}

export class ShiftCalculator {
	private startDate: Date
	private weekdays: string[]
	private workDaysPerCycle: number
	private restDaysPerCycle: number
	private cycleDays: number

	constructor(startDate: string) {
		this.startDate = new Date(startDate)
		this.weekdays = ["日", "一", "二", "三", "四", "五", "六"]
		this.workDaysPerCycle = 4
		this.restDaysPerCycle = 2
		this.cycleDays = this.workDaysPerCycle + this.restDaysPerCycle
	}

	private getDateAfterDays(startDate: Date, days: number): Date {
		const date = new Date(startDate)
		date.setDate(date.getDate() + days)
		return date
	}

	private formatDate(date: Date): string {
		const month = date.getMonth() + 1
		const day = date.getDate()
		const weekday = this.weekdays[date.getDay()]
		return `${month}月${day}日(周${weekday})`
	}

	calculateOverlap(cyclesToCheck: number = 10): ShiftResult[] {
		let results: ShiftResult[] = []
		let currentDate = new Date(this.startDate)
		let cycleCount = 0
		let foundFullWeekend = false

		while (cycleCount < cyclesToCheck || !foundFullWeekend) {
			// 工作4天
			const workStart = new Date(currentDate)
			const workEnd = this.getDateAfterDays(
				workStart,
				this.workDaysPerCycle - 1
			)

			// 休息2天
			const restStart = this.getDateAfterDays(workEnd, 1)
			const restEnd = this.getDateAfterDays(
				restStart,
				this.restDaysPerCycle - 1
			)

			// 检查休息日是否包含周末
			const restDays: string[] = []
			let weekendOverlap = 0
			for (
				let d = new Date(restStart);
				d <= restEnd;
				d.setDate(d.getDate() + 1)
			) {
				restDays.push(this.formatDate(new Date(d)))
				if (d.getDay() === 0 || d.getDay() === 6) {
					weekendOverlap++
				}
			}

			// 记录结果
			const result: ShiftResult = {
				cycle: cycleCount + 1,
				workPeriod: `${this.formatDate(workStart)} 至 ${this.formatDate(
					workEnd
				)}`,
				restPeriod: `${this.formatDate(restStart)} 至 ${this.formatDate(
					restEnd
				)}`,
				restDays,
				weekendOverlap,
				isFullWeekend:
					weekendOverlap === 2 &&
					restStart.getDay() === 6 &&
					restEnd.getDay() === 0,
			}

			results.push(result)

			if (result.isFullWeekend && !foundFullWeekend) {
				foundFullWeekend = true
				if (cycleCount > cyclesToCheck - 3) {
					cyclesToCheck = cycleCount + 2
				}
			}

			// 移动到下一个周期
			currentDate = this.getDateAfterDays(restEnd, 1)
			cycleCount++
		}

		return results
	}
}
