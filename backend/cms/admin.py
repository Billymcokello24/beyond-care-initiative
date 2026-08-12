from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Setting, HomePage, SiteBranding, HeroSlide, Stat, HomeHighlight, Testimonial,
    NavLink, SocialLink, TopBarInfo, FooterContent,
    TeamMember, MpesaConfig, SmtpConfig, NewsletterSubscriber,
    AboutStory, VisionMission, Value, FocusArea, TimelineMilestone,
    Program, Event, PastEvent, NewsArticle, GalleryItem,
    Partner, PartnerStrip,
    VolunteerRole, VolunteerBenefit,
    DonationTier, DonationMethod,
    ContactMessage, SuccessStory, Project,
)

# ═══════════════════════════════════════════════════════════════
# 🏠 HOMEPAGE
# ═══════════════════════════════════════════════════════════════
@admin.register(HomePage)
class HomePageAdmin(admin.ModelAdmin):
    def has_add_permission(self, request): return not HomePage.objects.exists()
    fieldsets = (
        ('Hero Section', {'fields': (
            ('hero_heading', 'hero_badge'),
            'hero_subtext',
            ('hero_image', 'hero_image_url'),
            ('cta_primary_text', 'cta_primary_link'),
            ('cta_secondary_text', 'cta_secondary_link'),
        )}),
        ('Highlights Section', {'fields': ('highlights_heading', 'highlights_subtext')}),
        ('Testimonials Section', {'fields': ('testimonials_heading',)}),
        ('CTA Cards', {'fields': (
            ('volunteer_cta_text', 'volunteer_cta_desc'),
            ('donate_cta_text', 'donate_cta_desc'),
        )}),
        ('Partners Strip', {'fields': ('partners_strip_heading',)}),
    )

@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ['caption', 'category', 'sort_order', 'published', 'image_preview']
    list_editable = ['sort_order', 'published']
    list_filter = ['published', 'category']
    def image_preview(self, obj):
        img = obj.image or obj.image_url
        if img: return format_html('<img src="{}" style="width:60px;height:40px;border-radius:4px;object-fit:cover"/>', img if str(img).startswith('http') else f'/media/{img}')
        return '-'
    image_preview.short_description = 'Image'

@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ['value', 'label', 'icon', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']
    list_filter = ['published']

@admin.register(HomeHighlight)
class HomeHighlightAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'link_path', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']
    list_filter = ['published']

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'location', 'stars_display', 'published']
    list_editable = ['published']
    list_filter = ['published']
    def stars_display(self, obj): return '⭐' * obj.stars
    stars_display.short_description = 'Rating'


# ═══════════════════════════════════════════════════════════════
# 📖 ABOUT PAGE
# ═══════════════════════════════════════════════════════════════
@admin.register(AboutStory)
class AboutStoryAdmin(admin.ModelAdmin):
    def has_add_permission(self, request): return not AboutStory.objects.exists()
    fieldsets = (
        ('Story Content', {'fields': ('heading', 'content_paragraph1', 'content_paragraph2', 'content_paragraph3')}),
        ('Image', {'fields': ('image', 'image_url')}),
        ('Stats Display', {'fields': (('stat1_value','stat1_label'),('stat2_value','stat2_label'),('stat3_value','stat3_label'))}),
    )

@admin.register(VisionMission)
class VisionMissionAdmin(admin.ModelAdmin):
    list_display = ['type', 'statement_preview']
    def statement_preview(self, obj): return obj.statement[:80] + '...' if len(obj.statement)>80 else obj.statement
    statement_preview.short_description = 'Statement'

@admin.register(Value)
class ValueAdmin(admin.ModelAdmin):
    list_display = ['label', 'icon', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']

@admin.register(FocusArea)
class FocusAreaAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'color', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'image_preview', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']
    def image_preview(self, obj):
        img = obj.photo or obj.photo_url
        if img: return format_html('<img src="{}" style="width:50px;height:50px;border-radius:50%;object-fit:cover"/>', img.url if hasattr(img,'url') and not str(img).startswith('http') else (f'/media/{img}' if not str(img).startswith('http') else img))
        return '-'
    image_preview.short_description = 'Photo'

@admin.register(TimelineMilestone)
class TimelineMilestoneAdmin(admin.ModelAdmin):
    list_display = ['year', 'title', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']


# ═══════════════════════════════════════════════════════════════
# 📋 PROGRAMS
# ═══════════════════════════════════════════════════════════════
@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ['title', 'stat_label', 'sort_order', 'published', 'updated_at']
    list_editable = ['sort_order', 'published']
    list_filter = ['published']
    search_fields = ['title', 'description']
    fieldsets = (
        ('Content', {'fields': ('title', 'subtitle', 'description')}),
        ('Visual', {'fields': ('icon', 'color', 'image', 'image_url')}),
        ('Details', {'fields': ('highlights', 'stat_label')}),
        ('Settings', {'fields': ('sort_order', 'published')}),
    )


# ═══════════════════════════════════════════════════════════════
# 📅 EVENTS
# ═══════════════════════════════════════════════════════════════
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'event_date', 'location', 'type', 'published']
    list_editable = ['published']
    list_filter = ['published', 'type']
    search_fields = ['title', 'location']
    fieldsets = (
        ('Content', {'fields': ('title', 'description')}),
        ('Details', {'fields': ('event_date', 'event_time', 'location', 'type')}),
        ('Visual', {'fields': ('image', 'image_url', 'accent_color')}),
        ('Settings', {'fields': ('published',)}),
    )

@admin.register(PastEvent)
class PastEventAdmin(admin.ModelAdmin):
    list_display = ['title', 'image_preview', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']
    def image_preview(self, obj):
        if obj.image_url: return format_html('<img src="{}" style="width:60px;height:40px;border-radius:4px;object-fit:cover"/>', obj.image_url)
        return '-'
    image_preview.short_description = 'Image'


# ═══════════════════════════════════════════════════════════════
# 📰 NEWS & BLOG
# ═══════════════════════════════════════════════════════════════
@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'tag', 'author', 'published_at', 'published']
    list_editable = ['published']
    list_filter = ['published', 'tag']
    search_fields = ['title', 'excerpt']
    fieldsets = (
        ('Content', {'fields': ('title', 'excerpt', 'content')}),
        ('Meta', {'fields': ('tag', 'tag_color', 'author')}),
        ('Visual', {'fields': ('image', 'image_url')}),
        ('Publishing', {'fields': ('published', 'published_at')}),
    )


# ═══════════════════════════════════════════════════════════════
# 🖼️ GALLERY
# ═══════════════════════════════════════════════════════════════
@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'image_preview', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']
    list_filter = ['published', 'category']
    def image_preview(self, obj):
        if obj.image_url: return format_html('<img src="{}" style="width:60px;height:40px;border-radius:4px;object-fit:cover"/>', obj.image_url)
        return '-'
    image_preview.short_description = 'Image'


# ═══════════════════════════════════════════════════════════════
# 🤝 PARTNERS & DONORS
# ═══════════════════════════════════════════════════════════════
@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ['name', 'partner_type', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']
    list_filter = ['published', 'partner_type']
    search_fields = ['name']

@admin.register(PartnerStrip)
class PartnerStripAdmin(admin.ModelAdmin):
    list_display = ['name', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']


# ═══════════════════════════════════════════════════════════════
# 🙋 VOLUNTEER
# ═══════════════════════════════════════════════════════════════
@admin.register(VolunteerRole)
class VolunteerRoleAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']

@admin.register(VolunteerBenefit)
class VolunteerBenefitAdmin(admin.ModelAdmin):
    list_display = ['title', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']


# ═══════════════════════════════════════════════════════════════
# 💰 DONATE
# ═══════════════════════════════════════════════════════════════
@admin.register(MpesaConfig)
class MpesaConfigAdmin(admin.ModelAdmin):
    def has_add_permission(self, request): return not MpesaConfig.objects.exists()
    fieldsets = (
        ('M-Pesa Daraja API Credentials', {'fields': ('consumer_key', 'consumer_secret', 'passkey')}),
        ('Business Details', {'fields': ('shortcode', 'business_name', 'environment')}),
    )

@admin.register(DonationTier)
class DonationTierAdmin(admin.ModelAdmin):
    list_display = ['amount', 'label', 'is_popular', 'sort_order', 'published']
    list_editable = ['is_popular', 'sort_order', 'published']

@admin.register(DonationMethod)
class DonationMethodAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']


# ═══════════════════════════════════════════════════════════════
# 📬 CONTACT
# ═══════════════════════════════════════════════════════════════
@admin.register(SmtpConfig)
class SmtpConfigAdmin(admin.ModelAdmin):
    def has_add_permission(self, request): return not SmtpConfig.objects.exists()

@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'subscribed', 'created_at']
    list_filter = ['subscribed']
    search_fields = ['email']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'read', 'created_at']
    list_filter = ['read']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    actions = ['mark_as_read']
    @admin.action(description="✅ Mark selected as read")
    def mark_as_read(self, request, queryset): queryset.update(read=True)


# ═══════════════════════════════════════════════════════════════
# 🌟 IMPACT PAGE
# ═══════════════════════════════════════════════════════════════
@admin.register(SuccessStory)
class SuccessStoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'progress_pct', 'beneficiaries', 'sort_order', 'published']
    list_editable = ['progress_pct', 'sort_order', 'published']
    list_filter = ['published']


# ═══════════════════════════════════════════════════════════════
# ⚙️ SETTINGS
# ═══════════════════════════════════════════════════════════════
@admin.register(Setting)
class SettingAdmin(admin.ModelAdmin):
    list_display = ['key', 'value', 'updated_at']
    search_fields = ['key']
    list_editable = ['value']


# ═══════════════════════════════════════════════════════════════
# 🔝 HEADER & FOOTER
# ═══════════════════════════════════════════════════════════════
@admin.register(SiteBranding)
class SiteBrandingAdmin(admin.ModelAdmin):
    def has_add_permission(self, request): return not SiteBranding.objects.exists()
    fieldsets = (
        ('Logo & Favicon', {'fields': ('site_logo', 'favicon')}),
        ('Footer Text', {'fields': ('footer_description',)}),
    )

@admin.register(NavLink)
class NavLinkAdmin(admin.ModelAdmin):
    list_display = ['label', 'path', 'is_cta', 'sort_order', 'published']
    list_editable = ['sort_order', 'published', 'is_cta']
    list_filter = ['published']

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['platform', 'icon', 'location', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']

@admin.register(TopBarInfo)
class TopBarInfoAdmin(admin.ModelAdmin):
    list_display = ['icon', 'text', 'sort_order', 'published']
    list_editable = ['sort_order', 'published']

@admin.register(FooterContent)
class FooterContentAdmin(admin.ModelAdmin):
    def has_add_permission(self, request): return not FooterContent.objects.exists()

# ═══════════════════════════════════════════════════════════════
# BRANDING
# ═══════════════════════════════════════════════════════════════
admin.site.site_header = "Beyond Care Initiative CMS"
admin.site.site_title = "Beyond Care CMS"
admin.site.index_title = "Content Management"
admin.site.site_url = "http://localhost:5173"
