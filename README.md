# Transfer Go Coding Task

> Deployed preview available at: http://tgo-antoni-task.vercel.app/

## Implementation details

- Tech used: TypeScript, React, Next.js, SCSS Modules, CSS variables, React Query, React Hook Form, Zod, RadixUI (for label and select), React Icons, use-debounce hook.
- The app does all the requirements that were written down in the provided spec PDF.
- The flags used are just emoji's, that are automatically inferred form currency code using a npm package.
- The app looks very close to the design, with only emojis, swap icon, and number input formatting not matching the design.
- No Next.js features were used, so this widget can be thrown into any other project, as long as it supports SCSS.
- Currency select is using `@radix-ui/select` as a headless select component, with SCSS styling applied. Same goes for the input labels (using `@radix-ui/label`).
- Form is implemented using React Hook Form in conjunction with Zod, which also allows creating API types from a validation schema.
- This was not requested in the spec, but you can click the "swap" button to switch the currencies. If you already clicked "convert" button, it will also swap the calculated currencies and exchange rate.

## Things that could be improved

- Number input implementation in the form is quite verbose. It can be refactored into a separate `CurrencyInput` component, which would abstract away copmlexity of currency input, and only expose simple component that forwards a ref, so that it can be used with react-hook-form's `register` function.
- Forms don't have any error display, so if there are any errors, they will not appear at all.
- Some micro-interactions are not specified in the design, for example hover states for the button, select list, etc. This is something that I'd ask designer to provide in a real project.
- I generally like to keep forms separate from the fetching logic (in another component). If I had time I'd try to move out the data fetching into the `ExchangeWidget` component, while keeping all the form state management in the `ExchangeForm`.
- Form state could be optimised both UX and DX-wise by implementing a state machine for it. This is not necessarily something I'd want to do in a real project, since it can be hard to understand a state machine for developers who don't have experience with them.
- SCSS is a mid-way solution between performance and developer experience. In a big application it would be hard to keep other developers from adding unnecessary repetitions in the CSS, resulting in way bigger source files than possible with TailwindCSS. Of course SCSS has better performance than any emotion/styled-components based solution, but it sacrifices developer productivity when compared to other solutions, while not providing the absolute smallest bundle size in big applications. Summarizing, I'd try to aim for both better DX and performance (by using Tailwind), instead of just the theoretically ideal performance that SCSS enables.
