import { Card } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';

export function PasswordValidationPopover({
  password,
  isValid,
  passwordError,
}) {
  return (
    <AnimatePresence>
      {password && !isValid && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Card className='absolute text-sm space-y-1 p-3 w-full top-10 left-0 shadow-lg z-10 bg-background/20 backdrop-blur-xl border border-muted'>
            <p className={passwordError ? 'text-red-500' : 'text-green-500'}>
              {passwordError || '✅ Valid password format'}
            </p>
            <ul className='space-y-1 text-muted-foreground'>
              <li
                className={`flex items-center gap-2 ${
                  password.length >= 8 ? 'text-green-500' : ''
                }`}
              >
                {password.length >= 8 ? '✅' : '⚪'} At least 8 characters
              </li>
              <li
                className={`flex items-center gap-2 ${
                  /[A-Za-z]/.test(password) ? 'text-green-500' : ''
                }`}
              >
                {/[A-Za-z]/.test(password) ? '✅' : '⚪'} At least one letter
              </li>
              <li
                className={`flex items-center gap-2 ${
                  /[0-9]/.test(password) ? 'text-green-500' : ''
                }`}
              >
                {/[0-9]/.test(password) ? '✅' : '⚪'} At least one number
              </li>
              <li
                className={`flex items-center gap-2 ${
                  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? 'text-green-500' : ''
                }`}
              >
                {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? '✅' : '⚪'} At least one
                special character
              </li>
            </ul>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
