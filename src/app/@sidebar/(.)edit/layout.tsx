import CloseButton from "@/components/edit-product/close-button";



export default function LayoutEdit({ children }: LayoutProps<"/edit">) {
  return (
    <div className="fixed sidebar w-full max-w-md border-r border-border p-6 overflow-y-auto inset-y-0  overflow-x-hidden z-50 h-screen bg-white shadow-lg">
      <CloseButton />
      {children}
    </div>
  );
}
