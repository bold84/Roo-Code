import { VSCodeCheckbox } from "@vscode/webview-ui-toolkit/react"
import { useEffect, useState } from "react"
import { useAppTranslation } from "@/i18n/TranslationContext"
import { useDebounce } from "react-use"

interface ParameterControlProps {
	// Common props
	value: number | undefined | null
	onChange: (value: number | undefined | null) => void

	// Parameterization props
	paramKey: string // e.g., "temperature", "minP", "topK"
	defaultValue?: number // Default value when enabled
	min?: number // Min slider value
	max: number // Max slider value
	step?: string | number // Step size
	parseValue?: (value: string) => number // Parser function
}

export const ParameterControl = ({
	value,
	onChange,
	paramKey,
	defaultValue = 0,
	min = 0,
	max,
	step = "0.01",
	parseValue = parseFloat,
}: ParameterControlProps) => {
	const { t } = useAppTranslation()
	const [isCustomValue, setIsCustomValue] = useState(value !== undefined)
	const [inputValue, setInputValue] = useState(value)
	useDebounce(() => onChange(inputValue), 50, [onChange, inputValue])

	// Sync internal state with prop changes when switching profiles
	useEffect(() => {
		const hasCustomValue = value !== undefined && value !== null
		setIsCustomValue(hasCustomValue)
		setInputValue(value)
	}, [value])

	return (
		<>
			<div>
				<VSCodeCheckbox
					checked={isCustomValue}
					onChange={(e: any) => {
						const isChecked = e.target.checked
						setIsCustomValue(isChecked)
						if (!isChecked) {
							setInputValue(null) // Unset the value, note that undefined is unserializable
						} else {
							setInputValue(value ?? defaultValue) // Use the value from apiConfiguration, if set
						}
					}}>
					<span className="font-medium">{t(`settings:${paramKey}.useCustom`)}</span>
				</VSCodeCheckbox>
				<div className="text-sm text-vscode-descriptionForeground">{t(`settings:${paramKey}.description`)}</div>
			</div>

			{isCustomValue && (
				<div
					style={{
						marginLeft: 0,
						paddingLeft: 10,
						borderLeft: "2px solid var(--vscode-button-background)",
					}}>
					<div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
						<input
							type="range"
							min={min}
							max={max}
							step={step}
							value={inputValue ?? defaultValue}
							className="h-2 focus:outline-0 w-4/5 accent-vscode-button-background"
							onChange={(e) => setInputValue(parseValue(e.target.value))}
						/>
						<span>{inputValue}</span>
					</div>
					<p className="text-vscode-descriptionForeground text-sm mt-1">
						{t(`settings:${paramKey}.rangeDescription`)}
					</p>
				</div>
			)}
		</>
	)
}
