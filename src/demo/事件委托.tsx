import { useEffect } from "react"

const EventComp = () => {
	const handleOuterClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		console.log(e)
		console.log("outer的合成事件---冒泡")
		e.stopPropagation()
	}

	const handleInnerClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		console.log("inner的合成事件---冒泡")
		// 只能阻止document的冒泡，以及合成事件的冒泡，不能阻止原生事件的冒泡
		// e.stopPropagation()

		e.nativeEvent.stopPropagation()
	}

	useEffect(() => {
		document.addEventListener(
			"click",
			e => {
				console.log("document的原生事件----捕获")
			},
			true
		)

		document.addEventListener(
			"click",
			e => {
				console.log("document的原生事件----冒泡")
			},
			false
		)

		const root = document.getElementById("root")
		root?.addEventListener(
			"click",
			e => {
				console.log("root的原生事件----捕获")
			},
			true
		)

		root?.addEventListener(
			"click",
			e => {
				console.log("root的原生事件----冒泡")
			},
			false
		)

		const outerEl = document.getElementsByClassName("outer")[0]
		outerEl?.addEventListener(
			"click",
			e => {
				console.log("outer的原生事件----捕获")
			},
			true
		)

		outerEl?.addEventListener(
			"click",
			e => {
				console.log("outer的原生事件----冒泡")
			},
			false
		)

		const innerEl = document.getElementsByClassName("inner")[0]
		innerEl?.addEventListener(
			"click",
			e => {
				console.log("inner的原生事件----捕获")
			},
			true
		)

		innerEl?.addEventListener(
			"click",
			e => {
				console.log("inner的原生事件----冒泡")
			},
			false
		)

		return () => {
			document.removeEventListener("click", e => {
				console.log("document的合成事件")
			})
		}
	}, [])

	return (
		<>
			<div
				className="outer w-20 h-20 flex items-center justify-center bg-[#ccc] m-auto"
				onClick={e => {
					handleOuterClick(e)
				}}
				onClickCapture={() => {
					console.log("outer的合成事件---捕获")
				}}
			>
				<div
					className=" inner w-5 h-5 bg-[red]"
					onClick={e => {
						handleInnerClick(e)
					}}
					onClickCapture={() => {
						console.log("inner的合成事件---捕获")
					}}
				></div>
			</div>
		</>
	)
}

export default EventComp
