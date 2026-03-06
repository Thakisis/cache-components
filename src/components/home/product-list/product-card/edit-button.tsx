"use client";
import { FilePen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
export interface Product {
  id: number;
}
export default function EditButton({ id }: Product) {
  const pathName = usePathname();
  const isEditing = pathName.startsWith("/edit");
  return (
    <Button size="lg" className="mt-1 w-full gap-2 font-semibold">
      <Link
        href={`/edit/${id}`}
        className="flex gap-2 w-full h-full items-center justify-center"
        replace={isEditing}
      >
        <FilePen className="size-4" />
        Edit Product
      </Link>
    </Button>
  );
}
