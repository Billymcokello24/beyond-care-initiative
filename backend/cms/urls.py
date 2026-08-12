from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views

router = DefaultRouter()

# Public endpoints (published only)
router.register(r'hero-slides', views.HeroSlideViewSet, basename='hero-slide')
router.register(r'stats', views.StatViewSet, basename='stat')
router.register(r'highlights', views.HomeHighlightViewSet, basename='highlight')
router.register(r'values', views.ValueViewSet, basename='value')
router.register(r'focus-areas', views.FocusAreaViewSet, basename='focus-area')
router.register(r'team', views.TeamMemberViewSet, basename='team')
router.register(r'timeline', views.TimelineMilestoneViewSet, basename='timeline')
router.register(r'testimonials', views.TestimonialViewSet, basename='testimonial')
router.register(r'programs', views.ProgramViewSet, basename='program')
router.register(r'events', views.EventViewSet, basename='event')
router.register(r'past-events', views.PastEventViewSet, basename='past-event')
router.register(r'news', views.NewsArticleViewSet, basename='news')
router.register(r'gallery', views.GalleryItemViewSet, basename='gallery')
router.register(r'partners', views.PartnerViewSet, basename='partner')
router.register(r'partner-strip', views.PartnerStripViewSet, basename='partner-strip')
router.register(r'volunteer-roles', views.VolunteerRoleViewSet, basename='volunteer-role')
router.register(r'volunteer-benefits', views.VolunteerBenefitViewSet, basename='volunteer-benefit')
router.register(r'donation-tiers', views.DonationTierViewSet, basename='donation-tier')
router.register(r'donation-methods', views.DonationMethodViewSet, basename='donation-method')
router.register(r'success-stories', views.SuccessStoryViewSet, basename='success-story')
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'contact-messages', views.ContactMessageViewSet, basename='contact-message')

# Admin endpoints (full CRUD)
admin_router = DefaultRouter()
admin_router.register(r'stats', views.AdminStatViewSet, basename='admin-stat')
admin_router.register(r'highlights', views.AdminHomeHighlightViewSet, basename='admin-highlight')
admin_router.register(r'values', views.AdminValueViewSet, basename='admin-value')
admin_router.register(r'focus-areas', views.AdminFocusAreaViewSet, basename='admin-focus-area')
admin_router.register(r'timeline', views.AdminTimelineMilestoneViewSet, basename='admin-timeline')
admin_router.register(r'testimonials', views.AdminTestimonialViewSet, basename='admin-testimonial')
admin_router.register(r'programs', views.AdminProgramViewSet, basename='admin-program')
admin_router.register(r'events', views.AdminEventViewSet, basename='admin-event')
admin_router.register(r'past-events', views.AdminPastEventViewSet, basename='admin-past-event')
admin_router.register(r'news', views.AdminNewsArticleViewSet, basename='admin-news')
admin_router.register(r'gallery', views.AdminGalleryItemViewSet, basename='admin-gallery')
admin_router.register(r'partners', views.AdminPartnerViewSet, basename='admin-partner')
admin_router.register(r'partner-strip', views.AdminPartnerStripViewSet, basename='admin-partner-strip')
admin_router.register(r'volunteer-roles', views.AdminVolunteerRoleViewSet, basename='admin-volunteer-role')
admin_router.register(r'volunteer-benefits', views.AdminVolunteerBenefitViewSet, basename='admin-volunteer-benefit')
admin_router.register(r'donation-tiers', views.AdminDonationTierViewSet, basename='admin-donation-tier')
admin_router.register(r'donation-methods', views.AdminDonationMethodViewSet, basename='admin-donation-method')
admin_router.register(r'success-stories', views.AdminSuccessStoryViewSet, basename='admin-success-story')
admin_router.register(r'projects', views.AdminProjectViewSet, basename='admin-project')

urlpatterns = [
    path('settings/', views.settings_list, name='settings'),
    path('mpesa-stkpush/', views.mpesa_stk_push, name='mpesa-stkpush'),
    path('mpesa-callback/', views.mpesa_callback, name='mpesa-callback'),
    path('newsletter-subscribe/', views.newsletter_subscribe, name='newsletter-subscribe'),
    path('homepage/', views.homepage_data, name='homepage'),
    path('branding/', views.branding_data, name='branding'),
    path('about-story/', views.about_story, name='about-story'),
    path('vision-mission/', views.vision_mission_list, name='vision-mission'),
] + router.urls + admin_router.urls
