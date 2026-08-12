const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const MEDIA_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:8000';

async function fetchAPI(path: string) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  // DRF paginated responses wrap results
  if (data.results) return data.results;
  return data;
}

export const api = {
  homepage:       () => fetchAPI('/homepage/'),
  branding:       () => fetchAPI('/branding/'),
  heroSlides:     () => fetchAPI('/hero-slides/'),
  settings:       () => fetchAPI('/settings/'),
  stats:          () => fetchAPI('/stats/'),
  highlights:     () => fetchAPI('/highlights/'),
  testimonials:   () => fetchAPI('/testimonials/'),
  aboutStory:     () => fetchAPI('/about-story/'),
  visionMission:  () => fetchAPI('/vision-mission/'),
  values:         () => fetchAPI('/values/'),
  focusAreas:     () => fetchAPI('/focus-areas/'),
  timeline:       () => fetchAPI('/timeline/'),
  team:           () => fetchAPI('/team/'),
  programs:       () => fetchAPI('/programs/'),
  events:         () => fetchAPI('/events/'),
  pastEvents:     () => fetchAPI('/past-events/'),
  news:           () => fetchAPI('/news/'),
  gallery:        () => fetchAPI('/gallery/'),
  partners:       () => fetchAPI('/partners/'),
  partnerStrip:   () => fetchAPI('/partner-strip/'),
  volunteerRoles: () => fetchAPI('/volunteer-roles/'),
  volunteerBenefits: () => fetchAPI('/volunteer-benefits/'),
  donationTiers:  () => fetchAPI('/donation-tiers/'),
  donationMethods:() => fetchAPI('/donation-methods/'),
  successStories: () => fetchAPI('/success-stories/'),
  projects:       () => fetchAPI('/projects/'),

  teamMember:     (id: number) => fetchAPI(`/team/${id}/`),
  programDetail:  (id: number) => fetchAPI(`/programs/${id}/`),
  eventDetail:    (id: number) => fetchAPI(`/events/${id}/`),
  newsDetail:     (id: number) => fetchAPI(`/news/${id}/`),

  // Helper: resolve image URL (upload > URL > empty)
  resolveImage: (obj: any) => {
    const img = obj?.resolved_image || obj?.image || obj?.image_url || '';
    if (!img) return '';
    if (typeof img === 'string' && img.startsWith('http')) return img;
    return `${MEDIA_URL}${img}`;
  },

  submitContact: async (data: any) => {
    const res = await fetch(`${API}/contact-messages/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  }
};
