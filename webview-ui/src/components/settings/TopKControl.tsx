import { ParameterControl } from "./ParameterControl"

interface TopKControlProps {
	value: number | undefined | null
	onChange: (value: number | undefined | null) => void
}

export const TopKControl = ({ value, onChange }: TopKControlProps) => {
	return (
		<ParameterControl
			value={value}
			onChange={onChange}
			paramKey="topK"
			defaultValue={40}
			min={1}
			max={100}
			step={1}
			parseValue={parseInt}
		/>
	)
}
