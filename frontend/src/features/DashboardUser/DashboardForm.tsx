
import type { User } from "../../types/userType";

interface DashboardUserFormProps {
  user: User | null;
  onLogout: () => void;
}

export default function DashboardForm({ user, onLogout }: DashboardUserFormProps) {
  return (
    <div className="user-dashboardForm">
      <h3 className="user-dashboardSetingTitle">Hi, {user?.username || "Guest"}!</h3>
      <button onClick={onLogout} className="user-dashboardLogoutButton">Logout</button>
    </div>
  );
}
