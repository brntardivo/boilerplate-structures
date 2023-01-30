import { Router } from 'express';

import { SignUpSchema } from '@modules/auth/signUp/SignUpSchema';
import { SignInSchema } from '@modules/auth/signIn/SignInSchema';
import { ValidateTokenSchema } from '@modules/auth/validateToken/ValidateTokenSchema';

const prefix = '/auth';
const router = Router();

router.post('/sign-up', SignUpSchema.validate, async (request, response) => {
  const { signUpController } = await import('@modules/auth/signUp');
  return signUpController.handle(request, response);
});

router.post('/sign-in', SignInSchema.validate, async (request, response) => {
  const { signInController } = await import('@modules/auth/signIn');
  return signInController.handle(request, response);
});

router.get(
  '/validate-token/:token',
  ValidateTokenSchema.validate,
  async (request, response) => {
    const { validateTokenController } = await import(
      '@modules/auth/validateToken'
    );
    return validateTokenController.handle(request, response);
  }
);

export { router, prefix };
