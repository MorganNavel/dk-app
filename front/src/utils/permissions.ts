import { Booking, Lesson, UserProfile } from "@/types/type";
type UserRole = "teacher" | "student" | "anonymous" | "admin";
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
      update: (user: UserProfile, data: Lesson[] | Lesson) => {
        if (Array.isArray(data)) {
          return data.every((lesson) => lesson.teacher.id === user.id);
        } else {
          return data.teacher.id === user.id;
        }
      },
      delete: (user: UserProfile, data: Lesson | Lesson[]) => {
        if (Array.isArray(data)) {
          return data.every((lesson) => lesson.teacher.id === user.id);
        } else {
          return data.teacher.id === user.id;
        }
      },
    },
    bookings: {
      read: true,
      create: false,
      update: false,
      delete: false,
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
      update: (user: UserProfile, data: Booking[] | Booking) => {
        if (Array.isArray(data)) {
          return data.every((booking) => booking.user?.id === user.id);
        } else {
          return data.user.id === user.id;
        }
      },
      delete: (user: UserProfile, data: Booking[] | Booking) => {
        if (Array.isArray(data)) {
          return data.every((booking) => booking.user.id === user.id);
        } else {
          return data.user.id === user.id;
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
      create: true,
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
  user: UserProfile,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
) {
  const role = user?.role ?? "anonymous";
  const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action];
  if (permission == null) return false;

  if (typeof permission === "boolean") return permission;
  return data != null && permission(user, data);
}
