from django.db import models

# ═══════════════════════════════════════════════════════════════
# 🏠 HOMEPAGE
# ═══════════════════════════════════════════════════════════════
class HomePage(models.Model):
    hero_heading = models.CharField(max_length=255, default="Rethink, Reshape & Restart Our Pathways")
    hero_subtext = models.TextField(default="Beyond Care Initiative CBO is building healthy, empowered, and resilient communities across Bungoma County through health promotion, youth empowerment, and sustainable development.")
    hero_badge = models.CharField(max_length=100, default="Community-Based Organization")
    hero_image = models.ImageField(upload_to='homepage/', blank=True, help_text="Upload a background image for the hero section")
    hero_image_url = models.URLField(max_length=500, blank=True, help_text="Or paste an image URL (used if no upload)")
    cta_primary_text = models.CharField(max_length=100, default="Explore Our Programs")
    cta_primary_link = models.CharField(max_length=200, default="/programs")
    cta_secondary_text = models.CharField(max_length=100, default="Learn About Us")
    cta_secondary_link = models.CharField(max_length=200, default="/about")
    highlights_heading = models.CharField(max_length=255, default="Making a Difference Across Bungoma County")
    highlights_subtext = models.TextField(default="We deliver comprehensive programs that address the most pressing health, social, and economic challenges.")
    testimonials_heading = models.CharField(max_length=255, default="Stories of Transformation")
    volunteer_cta_text = models.CharField(max_length=255, default="Become a Volunteer")
    volunteer_cta_desc = models.TextField(default="Join our team of dedicated volunteers making a real difference.")
    donate_cta_text = models.CharField(max_length=255, default="Support Our Work")
    donate_cta_desc = models.TextField(default="Your donation helps us provide critical health services and youth programs.")
    partners_strip_heading = models.CharField(max_length=255, default="Trusted by Leading Organizations")
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: verbose_name_plural = "🏠 Home Page Content"
    def __str__(self): return "Home Page Content"

class HeroSlide(models.Model):
    image = models.ImageField(upload_to='hero/', blank=True, help_text="Upload slide image")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or paste image URL (fallback)")
    caption = models.CharField(max_length=255, blank=True, help_text="Slide caption/heading")
    description = models.TextField(blank=True, help_text="Slide description")
    category = models.CharField(max_length=100, blank=True, help_text="e.g. Health, Youth, Community")
    link_path = models.CharField(max_length=200, blank=True, help_text="e.g. /programs or /news")
    link_text = models.CharField(max_length=100, blank=True, default="Learn More")
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "🏠 Hero Slides"
    def __str__(self): return self.caption or f"Slide {self.id}"

class Stat(models.Model):
    value = models.CharField(max_length=50, help_text="e.g. 9,850+")
    label = models.CharField(max_length=100, help_text="e.g. Individuals Reached")
    icon = models.CharField(max_length=50, default="Users")
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "🏠 Stat Cards"

class HomeHighlight(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, default="Heart")
    color = models.CharField(max_length=50, default="bg-primary")
    image = models.ImageField(upload_to='highlights/', blank=True, help_text="Upload image")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or paste image URL (fallback)")
    link_path = models.CharField(max_length=100, default="/programs")
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "🏠 Highlight Cards"

class Testimonial(models.Model):
    quote = models.TextField()
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    location = models.CharField(max_length=200, default="Kanduyi")
    stars = models.IntegerField(default=5)
    published = models.BooleanField(default=True)
    sort_order = models.IntegerField(default=0)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "🏠 Testimonials"


# ═══════════════════════════════════════════════════════════════
# 📖 ABOUT PAGE
# ═══════════════════════════════════════════════════════════════
class AboutStory(models.Model):
    heading = models.CharField(max_length=255, default="From Grassroots to Community Pillar")
    content_paragraph1 = models.TextField(blank=True)
    content_paragraph2 = models.TextField(blank=True)
    content_paragraph3 = models.TextField(blank=True)
    image = models.ImageField(upload_to='about/', blank=True, help_text="Upload image")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or paste image URL (fallback)")
    stat1_value = models.CharField(max_length=20, default="10+")
    stat1_label = models.CharField(max_length=50, default="Years Active")
    stat2_value = models.CharField(max_length=20, default="9,850+")
    stat2_label = models.CharField(max_length=50, default="Lives Impacted")
    stat3_value = models.CharField(max_length=20, default="45")
    stat3_label = models.CharField(max_length=50, default="Clinics Supported")
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: verbose_name_plural = "📖 About — Story Section"

class VisionMission(models.Model):
    VISION = 'vision'; MISSION = 'mission'
    TYPE_CHOICES = [(VISION,'Vision'),(MISSION,'Mission')]
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, unique=True)
    statement = models.TextField()
    icon = models.CharField(max_length=50, default="Eye")
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: verbose_name_plural = "📖 About — Vision & Mission"

class Value(models.Model):
    label = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, default="Shield")
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "📖 About — Core Values"

class FocusArea(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, default="Heart")
    color = models.CharField(max_length=50, default="bg-primary")
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "📖 About — Focus Areas"

class TeamMember(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200, help_text="e.g. Executive Director, Program Manager")
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='team/', blank=True)
    photo_url = models.URLField(max_length=500, blank=True, help_text="Or paste image URL")
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "📖 About — Team Members"
    def __str__(self): return self.name

class TimelineMilestone(models.Model):
    year = models.CharField(max_length=10)
    title = models.CharField(max_length=200)
    description = models.TextField()
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "📖 About — Timeline"


# ═══════════════════════════════════════════════════════════════
# 📋 PROGRAMS
# ═══════════════════════════════════════════════════════════════
class Program(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    color = models.CharField(max_length=50, blank=True)
    highlights = models.JSONField(default=list, blank=True)
    stat_label = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='programs/', blank=True, help_text="Upload image")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or paste image URL (fallback)")
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: ordering = ['sort_order', 'title']; verbose_name_plural = "📋 Programs List"


# ═══════════════════════════════════════════════════════════════
# 📅 EVENTS
# ═══════════════════════════════════════════════════════════════
class Event(models.Model):
    title = models.CharField(max_length=255)
    event_date = models.DateField()
    event_time = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=255, blank=True)
    type = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='events/', blank=True, help_text="Upload image")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or paste image URL (fallback)")
    accent_color = models.CharField(max_length=50, blank=True)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: ordering = ['event_date']; verbose_name_plural = "📅 Upcoming Events"

class PastEvent(models.Model):
    title = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='pastevents/', blank=True, help_text="Upload image")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or paste image URL (fallback if no upload)")
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "📅 Past Event Photos"


# ═══════════════════════════════════════════════════════════════
# 📰 NEWS
# ═══════════════════════════════════════════════════════════════
class NewsArticle(models.Model):
    title = models.CharField(max_length=255)
    excerpt = models.TextField(blank=True)
    content = models.TextField(blank=True)
    tag = models.CharField(max_length=100, blank=True)
    tag_color = models.CharField(max_length=50, blank=True)
    author = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='news/', blank=True, help_text="Upload image")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or paste image URL (fallback)")
    published = models.BooleanField(default=True)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: ordering = ['-published_at']; verbose_name = "News Article"; verbose_name_plural = "📰 News & Blog Articles"


# ═══════════════════════════════════════════════════════════════
# 🖼️ GALLERY
# ═══════════════════════════════════════════════════════════════
class GalleryItem(models.Model):
    title = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='gallery/', blank=True, help_text="Upload image")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or paste image URL (fallback if no upload)")
    category = models.CharField(max_length=100, blank=True)
    span_class = models.CharField(max_length=50, blank=True)
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta: ordering = ['sort_order']; verbose_name = "Gallery Item"; verbose_name_plural = "🖼️ Gallery Images"


# ═══════════════════════════════════════════════════════════════
# 🤝 PARTNERS
# ═══════════════════════════════════════════════════════════════
class Partner(models.Model):
    name = models.CharField(max_length=255)
    partner_type = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    logo_url = models.URLField(max_length=500, blank=True)
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta: ordering = ['sort_order', 'name']; verbose_name_plural = "🤝 Partners & Donors List"

class PartnerStrip(models.Model):
    name = models.CharField(max_length=255)
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "🤝 Partner Name Strip"


# ═══════════════════════════════════════════════════════════════
# 🙋 VOLUNTEER
# ═══════════════════════════════════════════════════════════════
class VolunteerRole(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, default="Heart")
    color = models.CharField(max_length=50, default="bg-accent")
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "🙋 Volunteer Roles"

class VolunteerBenefit(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "🙋 Volunteer Benefits"


# ═══════════════════════════════════════════════════════════════
# 💰 DONATE
# ═══════════════════════════════════════════════════════════════
class DonationTier(models.Model):
    amount = models.CharField(max_length=50)
    label = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, default="Heart")
    is_popular = models.BooleanField(default=False)
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "💰 Donation Tiers"

class MpesaConfig(models.Model):
    consumer_key = models.CharField(max_length=255, blank=True, help_text="M-Pesa Daraja Consumer Key")
    consumer_secret = models.CharField(max_length=255, blank=True, help_text="M-Pesa Daraja Consumer Secret")
    passkey = models.CharField(max_length=255, blank=True, help_text="M-Pesa Daraja Passkey")
    shortcode = models.CharField(max_length=50, blank=True, help_text="Paybill or Till number (e.g. 174379)")
    business_name = models.CharField(max_length=200, blank=True, default="Beyond Care Initiative")
    environment = models.CharField(max_length=20, default="sandbox", choices=[('sandbox','Sandbox'),('production','Production')])
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: verbose_name_plural = "📱 M-Pesa Configuration"
    def __str__(self): return f"M-Pesa Config ({self.environment})"

class SmtpConfig(models.Model):
    host = models.CharField(max_length=255, blank=True, default='smtp.gmail.com')
    port = models.IntegerField(default=587)
    username = models.EmailField(blank=True, help_text="SMTP email address")
    password = models.CharField(max_length=255, blank=True, help_text="SMTP password or app password")
    use_tls = models.BooleanField(default=True)
    from_email = models.EmailField(blank=True, help_text="From address for outgoing emails")
    from_name = models.CharField(max_length=200, blank=True, default="Beyond Care Initiative")
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: verbose_name_plural = "📧 SMTP Configuration"
    def __str__(self): return f"SMTP ({self.username or 'not configured'})"

class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=200, blank=True)
    subscribed = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta: ordering = ['-created_at']; verbose_name_plural = "📬 Newsletter Subscribers"
    def __str__(self): return self.email

class DonationMethod(models.Model):
    title = models.CharField(max_length=200)
    icon = models.CharField(max_length=10, default="📱")
    details = models.JSONField(default=list, blank=True)
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "💰 Payment Methods"


# ═══════════════════════════════════════════════════════════════
# 📬 CONTACT
# ═══════════════════════════════════════════════════════════════
class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta: ordering = ['-created_at']; verbose_name_plural = "📬 Contact Messages"


# ═══════════════════════════════════════════════════════════════
# 🌟 IMPACT PAGE
# ═══════════════════════════════════════════════════════════════
class SuccessStory(models.Model):
    name = models.CharField(max_length=200)
    story = models.TextField()
    location = models.CharField(max_length=200, default="Kanduyi")
    image = models.ImageField(upload_to='stories/', blank=True, help_text="Upload image")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or paste image URL (fallback)")
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "🌟 Success Stories"

class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    progress_pct = models.IntegerField(default=0)
    color = models.CharField(max_length=50, default="bg-primary")
    image = models.ImageField(upload_to='projects/', blank=True, help_text="Upload image")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or paste image URL (fallback)")
    beneficiaries = models.CharField(max_length=200, blank=True)
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "🌟 Projects & Impact"


# ═══════════════════════════════════════════════════════════════
# 🔝 HEADER & FOOTER
# ═══════════════════════════════════════════════════════════════
class SiteBranding(models.Model):
    site_logo = models.ImageField(upload_to='branding/', blank=True, help_text="Upload logo for header and footer")
    favicon = models.ImageField(upload_to='branding/', blank=True, help_text="Upload favicon")
    footer_description = models.TextField(blank=True, default='"Rethink, Reshape and Restart Our Pathways." Building healthy, empowered, and resilient communities across Bungoma County through health promotion, youth empowerment, and sustainable development.')
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: verbose_name_plural = "🔝 Site Branding"
    def __str__(self): return "Site Branding"

class NavLink(models.Model):
    label = models.CharField(max_length=100)
    path = models.CharField(max_length=200, help_text="e.g. /about or /programs")
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='children')
    is_cta = models.BooleanField(default=False, help_text="Show as a button")
    cta_style = models.CharField(max_length=50, blank=True, help_text="outline or solid")
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "🔝 Navigation Links"

class SocialLink(models.Model):
    platform = models.CharField(max_length=50, help_text="e.g. Facebook, Twitter")
    icon = models.CharField(max_length=50, default="Facebook", help_text="Lucide icon name")
    url = models.URLField(max_length=500)
    location = models.CharField(max_length=20, default="both", help_text="topbar, footer, or both")
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "🔝 Social Links"

class TopBarInfo(models.Model):
    icon = models.CharField(max_length=50, default="MapPin")
    text = models.CharField(max_length=255)
    sort_order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering = ['sort_order']; verbose_name_plural = "🔝 Top Bar Info"

class FooterContent(models.Model):
    brand_description = models.TextField(blank=True)
    copyright_text = models.CharField(max_length=255, default="© 2026 Beyond Care Initiative CBO. All rights reserved.")
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: verbose_name_plural = "🔝 Footer Content"

# ═══════════════════════════════════════════════════════════════
# ⚙️ SETTINGS
# ═══════════════════════════════════════════════════════════════
class Setting(models.Model):
    key = models.CharField(max_length=100, unique=True)
    value = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: verbose_name_plural = "⚙️ Site Settings"
    def __str__(self): return self.key
