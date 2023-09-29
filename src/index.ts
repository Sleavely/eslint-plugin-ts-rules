import { TSESLint } from '@typescript-eslint/utils';
import preferInferredConst from './prefer-inferred-const';

export const rules = {
  'prefer-inferred-const': preferInferredConst,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;
