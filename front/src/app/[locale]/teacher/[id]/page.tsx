import { UserProfile } from "@/types/User";
import { apiCall } from "@/utils/apiCall";

interface TeacherPageProps {
  params: {
    id: string;
  };
}
const TeacherPage = async ({ params }: TeacherPageProps) => {
  const { id } = params;
  const teacher = await apiCall<ApiResponse<UserProfile>>(
    "/api/v1/user/" + id + "/profile"
  );
  return <div>{teacher.data.name}</div>;
};

export default TeacherPage;
