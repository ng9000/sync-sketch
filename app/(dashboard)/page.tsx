"use client";
import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/board-states/empty-org";
import { BoardList } from "./_components/board-states/board-list";

interface DashboardPageParams {
  searchParams: {
    search?: string;
    favorite?: string;
  };
}
const DashboardPage = ({ searchParams }: DashboardPageParams) => {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList organizationId={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default DashboardPage;
