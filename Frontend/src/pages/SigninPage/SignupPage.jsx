import { SignupForm } from "./SignupForm";

export default function SignupPage() {
  return (
    <div className='flex items-center justify-center min-h-svh bg-main'>
      <div className='flex flex-col gap-8 p-6 md:p-10 items-center justify-center bg-background/30 backdrop-blur-2xl rounded-xl shadow-xl'>
        <div className='flex justify-center gap-2'>
          <div className='dark:flex items-center justify-start  hidden'>
            <img src='/scheduler_logo/Full_logo.svg' alt='Logo' className='h-8 w-auto' />
          </div>
          <div className='flex items-center justify-start  dark:hidden'>
            <img src='/scheduler_logo/Full_Logo_Blue.svg' alt='Logo' className='h-8 w-auto' />
          </div>
        </div>
        <div className='flex flex-1 items-center justify-center max-h-fit'>
          <div className='w-full max-w-xs'>
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
