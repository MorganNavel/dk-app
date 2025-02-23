import { Booking } from "@/types/Booking";
import { Lesson } from "@/types/Lesson";
import { Pricing } from "@/types/Pricing";
import { UserProfile, UserRole } from "@/types/User";

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: UserProfile, data: Permissions[Key]["dataType"]) => boolean);

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
    dataType: Lesson[];
    action: Action;
  };
  bookings: {
    dataType: Booking[];
    action: Action;
  };
  pricings: {
    dataType: Pricing;
    action: Action;
  };
};

const ROLES = {
  teacher: {
    lessons: {
      create: true,
      read: true,
      update: (user: UserProfile, data: Lesson[]) => {
        return !data.some((lesson) => lesson.teacher.idUser === user.idUser);
      },
      delete: (user: UserProfile, data: Lesson | Lesson[]) => {
        if (Array.isArray(data)) {
          return !data.some((lesson) => lesson.teacher.idUser === user.idUser);
        } else {
          return data.teacher.idUser === user.idUser;
        }
      },
    },
    bookings: {
      create: true,
      read: true,
      update: (user: UserProfile, data: Booking[]) =>
        !data.some((booking) => booking.lesson.teacher.idUser === user.idUser),

      delete: (user: UserProfile, data: Booking[]) =>
        !data.some((booking) => booking.lesson.teacher.idUser === user.idUser),
    },
    pricings: {
      create: true,
      read: true,
      update: true,
      delete: true,
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
      update: false,
      delete: (user: UserProfile, booking: Booking[]) =>
        !booking.some((booking) => booking.user.idUser === user.idUser),
    },
    pricings: {
      create: false,
      read: true,
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
    pricings: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
} as const satisfies RolesWithPermissions;

export function useHasPermission<Resource extends keyof Permissions>(
  user: UserProfile,
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
