# @sleavely/eslint-plugin-ts-rules

Opinionated rules for maintainable projects.

This plugin is a Typescript complement to the Javascript rules in [`@sleavely/eslint-plugin-js-rules`](https://github.com/Sleavely/eslint-plugin-js-rules).

## Installing

```sh
npm i --save-dev @sleavely/eslint-plugin-ts-rules
```

```js
// .eslintrc.cjs
module.exports = {
  // ..
  plugins: [
    '@sleavely/ts-rules',
  ],
  rules: {
    '@sleavely/ts-rules/prefer-inferred-const': ['error', 'always'],
  }
}
```

## Rules

### ts-rules/prefer-inferred-const

If [`no-inferrable-types`](https://typescript-eslint.io/rules/no-inferrable-types/) had a very strict parent, this rule would be it.

A `const` variable should generally never change, and even if it does it should be contained within the same type that it was originally inferred from.

```ts

// ⛔
const name: string = 'foo'
// ✅
const name = 'foo'

// methods _should_ already define a return type or have an inferrable one
const getBurger = (): string => 'Big Mac'
// ⛔
const burger: string = getBurger()
// ✅
const burger = getBurger()

// Sometimes you may want to assign a custom type such as an enum. Use this approach in those cases:
const name = 'foo' as MyCustomTypeThatIsntAPrimitive

const name = 'foo' as const
```
