import React from "react"
import { render, screen } from "@testing-library/react"
import { ParameterControl } from "../ParameterControl"

// Mock the translation hook
jest.mock("@/i18n/TranslationContext", () => ({
	useAppTranslation: () => ({
		t: (key: string) => {
			// Return a simple mapping for test keys
			const translations: Record<string, string> = {
				"settings:test.useCustom": "Use custom test",
				"settings:test.description": "Test description",
				"settings:test.rangeDescription": "Test range description",
			}
			return translations[key] || key
		},
	}),
}))

// Mock the useDebounce hook to execute immediately in tests
jest.mock("react-use", () => ({
	useDebounce: () => {
		// This is a no-op in tests
	},
}))

// Mock VSCodeCheckbox
jest.mock("@vscode/webview-ui-toolkit/react", () => ({
	VSCodeCheckbox: ({ children, checked }: any) => (
		<label data-testid="vscode-checkbox">
			<input type="checkbox" checked={checked} data-testid="checkbox-input" />
			{children}
		</label>
	),
}))

describe("ParameterControl", () => {
	const defaultProps = {
		value: undefined,
		onChange: jest.fn(),
		paramKey: "test",
		max: 1,
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("renders with checkbox unchecked when value is undefined", () => {
		render(<ParameterControl {...defaultProps} />)

		const checkbox = screen.getByTestId("checkbox-input")
		expect(checkbox).not.toBeChecked()

		// Slider should not be visible
		expect(screen.queryByRole("slider")).not.toBeInTheDocument()
	})

	it("renders with checkbox checked and slider visible when value is defined", () => {
		render(<ParameterControl {...defaultProps} value={0.5} />)

		const checkbox = screen.getByTestId("checkbox-input")
		expect(checkbox).toBeChecked()

		// Slider should be visible
		const slider = screen.getByRole("slider")
		expect(slider).toBeInTheDocument()
		expect(slider).toHaveValue("0.5")
	})

	it("shows slider with correct min, max and step values", () => {
		render(<ParameterControl {...defaultProps} value={0.5} min={0.1} max={2} step={0.1} />)

		const slider = screen.getByRole("slider")
		expect(slider).toHaveAttribute("min", "0.1")
		expect(slider).toHaveAttribute("max", "2")
		expect(slider).toHaveAttribute("step", "0.1")
	})

	it("displays the correct translation keys", () => {
		render(<ParameterControl {...defaultProps} value={0.5} />)

		// Check that the correct translation keys are used
		expect(screen.getByText("Use custom test")).toBeInTheDocument()
		expect(screen.getByText("Test description")).toBeInTheDocument()
		expect(screen.getByText("Test range description")).toBeInTheDocument()
	})
})
