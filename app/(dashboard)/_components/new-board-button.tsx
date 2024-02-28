import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create);

  const handleCreateOrganization = () => {
    mutate({
      orgId: orgId,
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
    <button
      disabled={pending || disabled}
      onClick={handleCreateOrganization}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        pending || (disabled && "opacity-50 hover:bg-blue-600")
      )}
    >
      <div className="" />
      <Plus className="size-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
};
