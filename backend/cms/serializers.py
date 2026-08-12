from rest_framework import serializers
from .models import (
    Setting, HomePage, SiteBranding, HeroSlide, Stat, HomeHighlight, AboutStory, VisionMission, Value,
    TeamMember,
    FocusArea, TimelineMilestone, Testimonial,
    Program, Event, PastEvent, NewsArticle, GalleryItem,
    Partner, PartnerStrip, VolunteerRole, VolunteerBenefit,
    DonationTier, DonationMethod,
    ContactMessage, SuccessStory, Project,
)

class SettingSerializer(serializers.ModelSerializer):
    class Meta: model = Setting; fields = '__all__'

class HomePageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta: model = HomePage; fields = '__all__'
    def get_image_url(self, obj):
        if obj.hero_image: return obj.hero_image.url
        return obj.hero_image_url

class ImageMixin(serializers.Serializer):
    resolved_image = serializers.SerializerMethodField()
    def get_resolved_image(self, obj):
        if hasattr(obj, 'image') and obj.image: return obj.image.url
        if hasattr(obj, 'image_url') and obj.image_url: return obj.image_url
        return None

class HeroSlideSerializer(ImageMixin, serializers.ModelSerializer):
    class Meta: model = HeroSlide; fields = '__all__'

class StatSerializer(serializers.ModelSerializer):
    class Meta: model = Stat; fields = '__all__'

class HomeHighlightSerializer(ImageMixin, serializers.ModelSerializer):
    class Meta: model = HomeHighlight; fields = '__all__'

class AboutStorySerializer(ImageMixin, serializers.ModelSerializer):
    class Meta: model = AboutStory; fields = '__all__'

class VisionMissionSerializer(serializers.ModelSerializer):
    class Meta: model = VisionMission; fields = '__all__'

class ValueSerializer(serializers.ModelSerializer):
    class Meta: model = Value; fields = '__all__'

class FocusAreaSerializer(serializers.ModelSerializer):
    class Meta: model = FocusArea; fields = '__all__'

class TeamMemberSerializer(ImageMixin, serializers.ModelSerializer):
    class Meta: model = TeamMember; fields = '__all__'

class TimelineMilestoneSerializer(serializers.ModelSerializer):
    class Meta: model = TimelineMilestone; fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta: model = Testimonial; fields = '__all__'

class ProgramSerializer(ImageMixin, serializers.ModelSerializer):
    class Meta: model = Program; fields = '__all__'

class EventSerializer(ImageMixin, serializers.ModelSerializer):
    class Meta: model = Event; fields = '__all__'

class PastEventSerializer(ImageMixin, serializers.ModelSerializer):
    class Meta: model = PastEvent; fields = '__all__'

class NewsArticleSerializer(ImageMixin, serializers.ModelSerializer):
    class Meta: model = NewsArticle; fields = '__all__'

class GalleryItemSerializer(ImageMixin, serializers.ModelSerializer):
    class Meta: model = GalleryItem; fields = '__all__'

class PartnerSerializer(serializers.ModelSerializer):
    class Meta: model = Partner; fields = '__all__'

class PartnerStripSerializer(serializers.ModelSerializer):
    class Meta: model = PartnerStrip; fields = '__all__'

class VolunteerRoleSerializer(serializers.ModelSerializer):
    class Meta: model = VolunteerRole; fields = '__all__'

class VolunteerBenefitSerializer(serializers.ModelSerializer):
    class Meta: model = VolunteerBenefit; fields = '__all__'

class DonationTierSerializer(serializers.ModelSerializer):
    class Meta: model = DonationTier; fields = '__all__'

class SiteBrandingSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    class Meta: model = SiteBranding; fields = '__all__'
    def get_logo_url(self, obj): return obj.site_logo.url if obj.site_logo else ''

class DonationMethodSerializer(serializers.ModelSerializer):
    class Meta: model = DonationMethod; fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta: model = ContactMessage; fields = '__all__'
    read_only_fields = ['read', 'created_at']

class SuccessStorySerializer(ImageMixin, serializers.ModelSerializer):
    class Meta: model = SuccessStory; fields = '__all__'

class ProjectSerializer(ImageMixin, serializers.ModelSerializer):
    class Meta: model = Project; fields = '__all__'
