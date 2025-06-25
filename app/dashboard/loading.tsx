import { Icons } from "@/components/icons";

export default function DashboardLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Icons.spinner className="h-12 w-12 animate-spin" />
    </div>
  );
}
