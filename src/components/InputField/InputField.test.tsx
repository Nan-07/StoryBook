
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField } from "./InputField";
import { expect, vi } from "vitest";
import '@testing-library/jest-dom';

describe("InputField", () => {
  it("renders label and helper text", () => {
    render(<InputField label="Name" helperText="Helper" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Helper")).toBeInTheDocument();
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    const handle = vi.fn();
    render(<InputField label="Name" onChange={handle} />);
    const input = screen.getByLabelText("Name") as HTMLInputElement;
    await user.type(input, "abc");
    expect(handle).toHaveBeenCalled();
  });

  it("displays error message", () => {
    render(<InputField label="Name" errorMessage="Error!" invalid />);
    expect(screen.getByRole("alert")).toHaveTextContent("Error!");
  });

  it("disables input when disabled prop is true", () => {
    render(<InputField label="Email" disabled />);
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("shows clear button when clearable and value is present", () => {
    const handle = vi.fn();
    render(<InputField label="Clearable" clearable value="abc" onChange={handle} />);
    expect(screen.getByLabelText("Clear input")).toBeInTheDocument();
  });

  it("calls onChange with empty value when clear button is clicked", async () => {
    const user = userEvent.setup();
    const handle = vi.fn();
    render(<InputField label="Clearable" clearable value="abc" onChange={handle} />);
    const clearBtn = screen.getByLabelText("Clear input");
    await user.click(clearBtn);
    expect(handle).toHaveBeenCalled();
    // Optionally check the event value
    expect(handle.mock.calls[0][0].target.value).toBe("");
  });

  it("shows password toggle when showPasswordToggle and type=password", () => {
    render(<InputField label="Password" type="password" showPasswordToggle />);
    expect(screen.getByLabelText("Show password")).toBeInTheDocument();
  });

  it("toggles password visibility when password toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<InputField label="Password" type="password" showPasswordToggle />);
    const toggleBtn = screen.getByLabelText("Show password");
    await user.click(toggleBtn);
    // After click, aria-label should change to "Hide password"
    expect(screen.getByLabelText("Hide password")).toBeInTheDocument();
  });

  it("shows loading spinner when loading is true", () => {
    render(<InputField label="Loading" loading />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox").parentElement?.querySelector("svg")).toHaveClass(
      "animate-spin"
    );
  });

  it("applies custom className", () => {
    render(<InputField label="Custom" className="custom-class" />);
    const input = screen.getByLabelText("Custom");
    expect(input).toHaveClass("custom-class"); // adjust if wrapper gets the class
  });

  it("renders with different variants and sizes", () => {
    render(<InputField label="Outlined" variant="outlined" size="lg" />);
    const input = screen.getByLabelText("Outlined");
    expect(input).toHaveClass("text-lg"); // adjust depending on how size is applied
  });
});
