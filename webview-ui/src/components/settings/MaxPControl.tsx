import { ParameterControl } from "./ParameterControl"

interface MaxPControlProps {
	value: number | undefined | null
	onChange: (value: number | undefined | null) => void
}

export const MaxPControl = ({ value, onChange }: MaxPControlProps) => {
	return <ParameterControl value={value} onChange={onChange} paramKey="maxP" max={1} />
}
