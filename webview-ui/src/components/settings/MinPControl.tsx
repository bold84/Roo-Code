import { ParameterControl } from "./ParameterControl"

interface MinPControlProps {
	value: number | undefined | null
	onChange: (value: number | undefined | null) => void
}

export const MinPControl = ({ value, onChange }: MinPControlProps) => {
	return <ParameterControl value={value} onChange={onChange} paramKey="minP" max={1} />
}
