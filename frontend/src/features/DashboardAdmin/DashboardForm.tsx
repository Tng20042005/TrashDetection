
import type { Admin } from "../../types/adminType";

interface DashboardAdminFormProps {
  admin: Admin | null;
  onLogout: () => void;
}

export default function DashboardForm({ admin, onLogout }: DashboardAdminFormProps) {
  return (
    <div className="admin-dashboardLogout">
      <h3 className="admin-dashboardLogoutTitle">Hi, {admin?.username || "Guest"}!</h3>
      <button onClick={onLogout} className="admin-dashboardLogoutButton">Logout</button>
    </div>
  );
}
