import { Booking } from "@/models/BookingModel";
import { Lesson } from "@/models/LessonModel";
import { Pricing } from "@/models/PricingModel";
import { User, UserRole } from "@/models/UserModel";
import { UserSession } from "@/types/Session";

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: UserSession, data: Permissions[Key]["dataType"]) => boolean);

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
  users: {
    dataType: User;
    action: Action;
  };
};

const ROLES = {
  teacher: {
    lessons: {
      create: true,
      read: true,
      update: (user: UserSession, data: Lesson[]) => {
        return !data.some((lesson) => lesson.teacher.idUser === user.idUser);
      },
      delete: (user: UserSession, data: Lesson | Lesson[]) => {
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
      update: (user: UserSession, data: Booking[]) =>
        !data.some((booking) => booking.lesson.teacher.idUser === user.idUser),

      delete: (user: UserSession, data: Booking[]) =>
        !data.some((booking) => booking.lesson.teacher.idUser === user.idUser),
    },
    pricings: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    users: {
      create: false,
      read: true,
      update: (user: UserSession, data: User) => user.idUser === data.idUser,
      delete: (user: UserSession, data: User) => user.idUser === data.idUser,
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
      delete: (user: UserSession, booking: Booking[]) =>
        !booking.some((booking) => booking.user.idUser === user.idUser),
    },
    pricings: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    users: {
      create: false,
      read: true,
      update: (user: UserSession, userToUpdate: User) =>
        user.idUser === userToUpdate.idUser,
      delete: (user: UserSession, userToDelete: User) =>
        user.idUser === userToDelete.idUser,
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
    users: {
      create: false,
      read: true,
      update: true,
      delete: true,
    },
  },
} as const satisfies RolesWithPermissions;
export function hasPermission<Resource extends keyof Permissions>(
  user: UserSession,
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
