import { Navigate, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { useMockAccount, type MockRole } from "@/lib/mockAuth";
import Dashboard from "@/pages/Dashboard";
import ArtistDashboard from "@/pages/ArtistDashboard";
import ClientProjectDashboard from "@/pages/ClientProjectDashboard";
import ProjectSetup from "@/pages/ProjectSetup";
import { OperationsPage } from "@/pages/OperationsPage";
import BrandInputs from "@/pages/BrandInputs";
import MessagingMap from "@/pages/MessagingMap";
import Concepts from "@/pages/Concepts";
import InspirationLibrary from "@/pages/InspirationLibrary";
import ImagePrompts from "@/pages/ImagePrompts";
import FigmaBriefs from "@/pages/FigmaBriefs";
import HumanRevisions from "@/pages/HumanRevisions";

function RoleGate({ role, children }: { role: MockRole; children: React.ReactNode }) {
  const account = useMockAccount();
  if (account.role !== role) {
    return <Navigate to={account.homePath} replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<RoleGate role="admin"><Dashboard /></RoleGate>} />
        <Route path="/admin/projects" element={<RoleGate role="admin"><OperationsPage moduleKey="admin-projects" /></RoleGate>} />
        <Route path="/admin/tasks" element={<RoleGate role="admin"><OperationsPage moduleKey="admin-tasks" /></RoleGate>} />
        <Route path="/admin/submissions" element={<RoleGate role="admin"><OperationsPage moduleKey="admin-submissions" /></RoleGate>} />
        <Route path="/admin/calendar" element={<RoleGate role="admin"><OperationsPage moduleKey="admin-calendar" /></RoleGate>} />
        <Route path="/admin/artists" element={<RoleGate role="admin"><OperationsPage moduleKey="admin-artists" /></RoleGate>} />
        <Route path="/admin/brands" element={<RoleGate role="admin"><OperationsPage moduleKey="admin-brands" /></RoleGate>} />
        <Route path="/admin/settings" element={<RoleGate role="admin"><OperationsPage moduleKey="admin-settings" /></RoleGate>} />
        <Route path="/clients/:clientId" element={<RoleGate role="admin"><ClientProjectDashboard /></RoleGate>} />
        <Route path="/setup" element={<RoleGate role="admin"><ProjectSetup /></RoleGate>} />
        <Route path="/brand" element={<RoleGate role="admin"><BrandInputs /></RoleGate>} />
        <Route path="/messaging" element={<RoleGate role="admin"><MessagingMap /></RoleGate>} />
        <Route path="/concepts" element={<RoleGate role="artist"><Concepts /></RoleGate>} />
        <Route path="/inspiration" element={<RoleGate role="admin"><InspirationLibrary /></RoleGate>} />
        <Route path="/prompts" element={<RoleGate role="admin"><ImagePrompts /></RoleGate>} />
        <Route path="/briefs" element={<RoleGate role="admin"><FigmaBriefs /></RoleGate>} />
        <Route path="/revisions" element={<RoleGate role="admin"><HumanRevisions /></RoleGate>} />
        <Route path="/artist" element={<RoleGate role="artist"><ArtistDashboard /></RoleGate>} />
        <Route path="/artist/tasks" element={<RoleGate role="artist"><OperationsPage moduleKey="artist-tasks" /></RoleGate>} />
        <Route path="/artist/tasks/:taskId" element={<RoleGate role="artist"><OperationsPage moduleKey="artist-task-brief" /></RoleGate>} />
        <Route path="/artist/submit" element={<RoleGate role="artist"><OperationsPage moduleKey="artist-submit" /></RoleGate>} />
        <Route path="/artist/submissions" element={<RoleGate role="artist"><OperationsPage moduleKey="artist-submissions" /></RoleGate>} />
        <Route path="/artist/settings" element={<RoleGate role="artist"><OperationsPage moduleKey="artist-settings" /></RoleGate>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
