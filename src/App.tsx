import { Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import ClientProjectDashboard from "@/pages/ClientProjectDashboard";
import ProjectSetup from "@/pages/ProjectSetup";
import BrandInputs from "@/pages/BrandInputs";
import MessagingMap from "@/pages/MessagingMap";
import Concepts from "@/pages/Concepts";
import InspirationLibrary from "@/pages/InspirationLibrary";
import ImagePrompts from "@/pages/ImagePrompts";
import FigmaBriefs from "@/pages/FigmaBriefs";
import HumanRevisions from "@/pages/HumanRevisions";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients/:clientId" element={<ClientProjectDashboard />} />
        <Route path="/setup" element={<ProjectSetup />} />
        <Route path="/brand" element={<BrandInputs />} />
        <Route path="/messaging" element={<MessagingMap />} />
        <Route path="/concepts" element={<Concepts />} />
        <Route path="/inspiration" element={<InspirationLibrary />} />
        <Route path="/prompts" element={<ImagePrompts />} />
        <Route path="/briefs" element={<FigmaBriefs />} />
        <Route path="/revisions" element={<HumanRevisions />} />
      </Route>
    </Routes>
  );
}
