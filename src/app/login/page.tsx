import { LoginForm } from "@/components/FormLogin/LoginForm";
import { getProfile } from "@/hooks-query/queries/use-get-user-profile";
import { authenticate } from "@/lib/actions";
import { setAuthToken } from "@/web-configs/community-api";

const LoginPage = async () => {
  return <LoginForm />;
};
export default LoginPage;
