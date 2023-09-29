import { TSESLint, TSESTree } from '@typescript-eslint/utils';

type MessageIds = 'preferInference';
const defaultOptions = ['always']
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> = {
  defaultOptions,
  meta: {
    type: 'suggestion',
    messages: {
      preferInference: 'You generally never have to define a type for const since it will never differ from its original assigned values type. Typescript can automatically infer types: https://www.typescriptlang.org/docs/handbook/type-inference.html',
    },
    fixable: 'code',
    schema: [
      {
        type: 'string',
        enum: ['always', 'never'],
      }
    ], // no options
  },
  create: context => ({
    'VariableDeclaration[kind="const"] > VariableDeclarator > Identifier > TSTypeAnnotation': (typeAnnotation: TSESTree.TSTypeAnnotation) => {
      const identifier = typeAnnotation.parent

      context.report({
        node: identifier,
        messageId: 'preferInference',

        *fix(fixer) {
          yield fixer.remove(typeAnnotation);
        },
      })
    },
  })
}

export default rule
