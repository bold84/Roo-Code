import { ParameterControl } from "./ParameterControl"

interface RepetitionPenaltyControlProps {
	value: number | undefined | null
	onChange: (value: number | undefined | null) => void
}

export const RepetitionPenaltyControl = ({ value, onChange }: RepetitionPenaltyControlProps) => {
	return (
		<ParameterControl
			value={value}
			onChange={onChange}
			paramKey="repetitionPenalty"
			defaultValue={1.0}
			min={1.0}
			max={2.0}
			step="0.01"
		/>
	)
}
