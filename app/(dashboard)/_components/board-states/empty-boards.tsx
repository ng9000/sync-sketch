import { api } from "@/convex/_generated/api";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

export const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const handleCreateOrganization = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
      })
      .catch((err) => {
        console.log(err, "handleCreateOrganization");
      });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center select-none">
      <Image
        src="/note.svg"
        width={110}
        height={110}
        alt="empty"
        draggable={false}
      />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size="lg" onClick={handleCreateOrganization} disabled={pending}>
          {pending ? "Loading..." : "Create board"}
        </Button>
      </div>
    </div>
  );
};
