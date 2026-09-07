"use client";

import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Checkbox } from "./checkbox";

/**
 * Wires the Radix-based `Checkbox` (a `<button role="checkbox">`, not a
 * native `<input type="checkbox">`) up to react-hook-form correctly.
 *
 * `{...register("x")}` only produces a boolean for a *native* checkbox
 * input — react-hook-form's internals decide whether to read
 * `event.target.checked` vs `event.target.value` by checking
 * `ref.type === "checkbox"`, which a Radix button never satisfies. Spread
 * onto Radix, register's onChange either never fires the way RHF expects or
 * resolves to the button's stray `.value` (a string), and any zod schema
 * with `z.boolean()` on that field rejects the submit with "expected
 * boolean, received string" — silently, before any network request. Every
 * checkbox bound to react-hook-form in this app should use this instead of
 * spreading `register()` onto `<Checkbox>` directly.
 */
export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  className,
}: {
  control: Control<T>;
  name: FieldPath<T>;
  className?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Checkbox
          className={className}
          checked={field.value ?? false}
          onCheckedChange={(checked) => field.onChange(checked === true)}
          onBlur={field.onBlur}
          ref={field.ref}
        />
      )}
    />
  );
}
