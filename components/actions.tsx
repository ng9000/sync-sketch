import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) => {
  const { onOpen } = useRenameModal();
  const { mutate, pending } = useApiMutation(api.board.remove);
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Link copied");
      });
  };
  const onDelete = () => {
    mutate({ id })
      .then(() => {
        toast.success("Board deleted");
      })
      .catch(() => {
        toast.error("Failed to delete board");
      });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="size-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={() => onOpen(id, title)}
        >
          <Pencil className="size-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          disabled={pending}
          header="Delete board?"
          description="This will delete the board and all its contents"
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="text-sm w-full justify-start font-normal p-3 cursor-pointer"
          >
            <Trash2 className="size-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
