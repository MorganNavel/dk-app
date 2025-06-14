import { Booking } from "@/types/Booking";
import { Lesson } from "@/types/Lesson";
import { ProfileMe, UserRole } from "@/types/User";

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: ProfileMe, data: Permissions[Key]["dataType"]) => boolean);

type RolesWithPermissions = {
  [R in UserRole]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>;
    }>;
  }>;
};
type Action = "create" | "read" | "update" | "delete";

type Permissions = {
  lessons: {
    dataType: Lesson[] | Lesson;
    action: Action;
  };
  bookings: {
    dataType: Booking[] | Booking;
    action: Action;
  };
};

const ROLES = {
  teacher: {
    lessons: {
      create: true,
      read: true,
      update: (user: ProfileMe, data: Lesson[] | Lesson) => {
        if (Array.isArray(data)) {
          return data.every((lesson) => lesson.teacher.idUser === user.idUser);
        } else {
          return data.teacher.idUser === user.idUser;
        }
      },
      delete: (user: ProfileMe, data: Lesson | Lesson[]) => {
        if (Array.isArray(data)) {
          return data.every((lesson) => lesson.teacher.idUser === user.idUser);
        } else {
          return data.teacher.idUser === user.idUser;
        }
      },
    },
  },
  student: {
    lessons: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    bookings: {
      create: true,
      read: true,
      update: (user: ProfileMe, data: Booking[] | Booking) => {
        if (Array.isArray(data)) {
          return data.every((booking) => booking.user.idUser === user.idUser);
        } else {
          return data.user.idUser === user.idUser;
        }
      },
      delete: (user: ProfileMe, data: Booking[] | Booking) => {
        if (Array.isArray(data)) {
          return data.every((booking) => booking.user.idUser === user.idUser);
        } else {
          return data.user.idUser === user.idUser;
        }
      },
    },
  },
  anonymous: {
    lessons: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    bookings: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
  },
  admin: {
    lessons: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    bookings: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
} as const satisfies RolesWithPermissions;

export function hasPermission<Resource extends keyof Permissions>(
  user: ProfileMe,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
) {
  const permission = (ROLES as RolesWithPermissions)[user.role][resource]?.[
    action
  ];
  if (permission == null) return false;

  if (typeof permission === "boolean") return permission;
  return data != null && permission(user, data);
}
