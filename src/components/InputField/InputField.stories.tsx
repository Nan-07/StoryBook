// src/components/InputField/InputField.stories.tsx
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";
import type { InputFieldProps } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    variant: { control: "radio", options: ["filled", "outlined", "ghost"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    type: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;


const PlaygroundComponent = (args: InputFieldProps) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Playground: Story = {
  render: PlaygroundComponent,
  args: {
    label: "Email",
    placeholder: "you@example.com",
    helperText: "We'll never share your email",
    variant: "outlined",
    size: "md",
    clearable: true,
  },
};


const PasswordComponent = (args: InputFieldProps) => {
  const [value, setValue] = useState("");
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Password: Story = {
  render: PasswordComponent,
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    showPasswordToggle: true,
    clearable: true,
  },
};


const ErrorStateComponent = (args: InputFieldProps) => {
  const [value, setValue] = useState("");
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const ErrorState: Story = {
  render: ErrorStateComponent,
  args: {
    label: "Username",
    errorMessage: "Username is required",
    invalid: true,
    variant: "outlined",
  },
};
