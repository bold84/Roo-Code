import { ParameterControl } from "./ParameterControl"

interface TemperatureControlProps {
	value: number | undefined | null
	onChange: (value: number | undefined | null) => void
	maxValue?: number // Some providers like OpenAI use 0-2 range
}

export const TemperatureControl = ({ value, onChange, maxValue = 1 }: TemperatureControlProps) => {
	return <ParameterControl value={value} onChange={onChange} paramKey="temperature" max={maxValue} />
}
