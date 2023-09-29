import { RuleTester } from '@typescript-eslint/rule-tester';

import rule from './prefer-inferred-const';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser'
});

ruleTester.run('prefer-inferred-const', rule, {
  valid: [
    'const name = "foo"',

    `const getBurger = (): string => 'Big Mac'
         const food = getBurger()`,

    `const name = 'foo' as MyCustomTypeThatIsntAPrimitive`,

    `const name = 'foo' as const`,

    `let foo: string = 'Using let is freeforall'`
  ],
  invalid: [
    {
      code: 'const name: string = "foo"',
      errors: [{ messageId: 'preferInference' }],
    },
    {
      code: `const getBurger = (): string => 'Big Mac'
         const food: string = getBurger()`,
      errors: [{ messageId: 'preferInference' }],
    },
    {
      code: `const name: MyCustomTypeThatIsntAPrimitive = 'foo'`,
      errors: [{ messageId: 'preferInference' }],
    },
  ],
});
