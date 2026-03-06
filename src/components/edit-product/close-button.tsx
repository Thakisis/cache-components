"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();
  return (
    <div className="absolute -right-1 -top-1 ">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-medium p-2 cursor-pointer"
      >
        <X className="size-6" />
      </button>
    </div>
  );
}
