import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProgramsPage from "./pages/ProgramsPage";
import ImpactPage from "./pages/ImpactPage";
import EventsPage from "./pages/EventsPage";
import NewsPage from "./pages/NewsPage";
import GalleryPage from "./pages/GalleryPage";
import PartnersPage from "./pages/PartnersPage";
import VolunteerPage from "./pages/VolunteerPage";
import DonatePage from "./pages/DonatePage";
import ContactPage from "./pages/ContactPage";
import TeamMemberDetail from "./pages/detail/TeamMemberDetail";
import ProgramDetail from "./pages/detail/ProgramDetail";
import NewsDetail from "./pages/detail/NewsDetail";
import EventDetail from "./pages/detail/EventDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="programs" element={<ProgramsPage />} />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="volunteer" element={<VolunteerPage />} />
        <Route path="donate" element={<DonatePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="team/:id" element={<TeamMemberDetail />} />
        <Route path="programs/:id" element={<ProgramDetail />} />
        <Route path="news/:id" element={<NewsDetail />} />
        <Route path="events/:id" element={<EventDetail />} />
      </Route>
    </Routes>
  );
}
