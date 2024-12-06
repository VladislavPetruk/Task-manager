import Link from 'next/link';
import { CircleAlert, CircleCheck } from 'lucide-react';

import { verifyEmail } from '@/app/actions/tokenActions';
import { SendNewConfirmation } from '@/components/SendNewConfirmation';

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const result = await verifyEmail(searchParams.token);

  if (!result) return null;

  return (
    <div className="mx-auto max-w-md text-center">
      {result.status == 'success' ? (
        <>
          <CircleCheck className="mx-auto mb-4 text-green-500" size={48} />
          <p className="mt-4 text-center text-muted-foreground">
            Congratulations, you successfully confirm your account. Now, you can
            sign in to Dashboard.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Sing in to Dashboard
          </Link>
        </>
      ) : (
        <>
          <CircleAlert className="mx-auto mb-4 text-red-500" size={48} />
          <p className="mb-6 mt-4 text-center text-2xl font-medium text-muted-foreground">
            {result.error as string}
          </p>
          <p className="mb-6 text-center text-muted-foreground">
            Sorry, something went wrong. Please, enter your email and we send
            you a new confirmation letter
          </p>
          <SendNewConfirmation />
        </>
      )}
    </div>
  );
}
