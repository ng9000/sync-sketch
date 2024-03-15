"use client";
import { connectionIdToColor } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { useOthers, useSelf } from "@/liveblocks.config";

const SHOW_MAX_USERS = 3;
export const Participants = () => {
  const users = useOthers();
  const self = useSelf();

  const hasMoreUsers = users.length > SHOW_MAX_USERS;
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, SHOW_MAX_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          );
        })}
        {self && (
          <UserAvatar
            borderColor={connectionIdToColor(self.connectionId)}
            src={self?.info?.picture}
            name={`${self?.info?.name} (You)`}
            fallback={self?.info?.name?.[0]}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - SHOW_MAX_USERS} more`}
            fallback={`+${users.length - SHOW_MAX_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute top-2 right-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[100px]" />
  );
};
