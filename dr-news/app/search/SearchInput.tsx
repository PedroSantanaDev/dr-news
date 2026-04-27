'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SearchInput({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get('q') as string;
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <input
        name="q"
        type="text"
        defaultValue={defaultValue}
        placeholder="Buscar noticias..."
        className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button type="submit" className="cursor-pointer">Buscar</Button>
    </form>
  );
}