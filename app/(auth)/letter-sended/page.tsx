import Link from 'next/link';
import { CircleCheck } from 'lucide-react';

export default function LetterSendedPage() {
  return (
    <div className="mx-auto max-w-md text-center">
      <CircleCheck className="mx-auto mb-4 text-green-500" size={48} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
        Letter successfully sended!
      </h1>
      <p className="mt-4 text-muted-foreground">
        Congratulations, check your email for the new letter we’ve recently sent
        you, please follow the link from the letter.
      </p>
      <Link
        href="/login"
        className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Sing in to Dashboard
      </Link>
    </div>
  );
}
