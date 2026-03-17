import { UpdateHighlight } from "./update-hightlight";
export function UpdateWrapper({
  children,
  updatedAt,
}: {
  children: React.ReactNode;
  updatedAt: number;
}) {
  const updatedate = Date.now();
  return <UpdateHighlight updatedAt={updatedate}>{children}</UpdateHighlight>;
}
