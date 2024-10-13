import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hikeroo</h1>
      <Link href='/auth/register'>Register Page</Link>
      <Link href='/auth/login'>Login Page</Link>
    </main>
  )
}
