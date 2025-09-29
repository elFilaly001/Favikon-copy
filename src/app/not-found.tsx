import { redirect } from 'next/navigation';

export default function NotFound() {
  // Immediately redirect to home page
  redirect('/');
}