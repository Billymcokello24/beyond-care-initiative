import base64, requests, datetime
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import (
    Setting, HomePage, SiteBranding, HeroSlide, Stat, HomeHighlight, AboutStory, VisionMission, Value,
    MpesaConfig, NewsletterSubscriber, SmtpConfig,
    FocusArea, TimelineMilestone, TeamMember, Testimonial,
    Program, Event, PastEvent, NewsArticle, GalleryItem,
    Partner, PartnerStrip, VolunteerRole, VolunteerBenefit,
    DonationTier, DonationMethod,
    ContactMessage, SuccessStory, Project,
)
from .serializers import (
    SettingSerializer, HomePageSerializer, SiteBrandingSerializer,
    HeroSlideSerializer, StatSerializer, HomeHighlightSerializer,
    AboutStorySerializer, VisionMissionSerializer, ValueSerializer,
    FocusAreaSerializer, TimelineMilestoneSerializer, TeamMemberSerializer, TestimonialSerializer,
    ProgramSerializer, EventSerializer, PastEventSerializer,
    NewsArticleSerializer, GalleryItemSerializer,
    PartnerSerializer, PartnerStripSerializer,
    VolunteerRoleSerializer, VolunteerBenefitSerializer,
    DonationTierSerializer, DonationMethodSerializer,
    ContactMessageSerializer, SuccessStorySerializer, ProjectSerializer,
)


# ─── Settings (key-value) ────────────────────────────────────────────────────
@api_view(['GET'])
def settings_list(request):
    data = {s.key: s.value for s in Setting.objects.all()}
    return Response(data)

@api_view(['GET'])
def homepage_data(request):
    obj = HomePage.objects.first()
    if obj: return Response(HomePageSerializer(obj).data)
    return Response({})

@api_view(['GET'])
def branding_data(request):
    obj = SiteBranding.objects.first()
    if obj: return Response(SiteBrandingSerializer(obj).data)
    return Response({})


# ─── Public ViewSets (published only) ────────────────────────────────────────

class PublishedViewSet(viewsets.ReadOnlyModelViewSet):
    def get_queryset(self): return self.queryset.filter(published=True)

class HeroSlideViewSet(PublishedViewSet):
    queryset = HeroSlide.objects.all(); serializer_class = HeroSlideSerializer

class StatViewSet(PublishedViewSet):
    queryset = Stat.objects.all(); serializer_class = StatSerializer

class HomeHighlightViewSet(PublishedViewSet):
    queryset = HomeHighlight.objects.all(); serializer_class = HomeHighlightSerializer

class ValueViewSet(PublishedViewSet):
    queryset = Value.objects.all(); serializer_class = ValueSerializer

class FocusAreaViewSet(PublishedViewSet):
    queryset = FocusArea.objects.all(); serializer_class = FocusAreaSerializer

class TeamMemberViewSet(PublishedViewSet):
    queryset = TeamMember.objects.all(); serializer_class = TeamMemberSerializer

class TimelineMilestoneViewSet(PublishedViewSet):
    queryset = TimelineMilestone.objects.all(); serializer_class = TimelineMilestoneSerializer

class TestimonialViewSet(PublishedViewSet):
    queryset = Testimonial.objects.all(); serializer_class = TestimonialSerializer

class ProgramViewSet(PublishedViewSet):
    queryset = Program.objects.all(); serializer_class = ProgramSerializer

class EventViewSet(PublishedViewSet):
    queryset = Event.objects.all(); serializer_class = EventSerializer

class PastEventViewSet(PublishedViewSet):
    queryset = PastEvent.objects.all(); serializer_class = PastEventSerializer

class NewsArticleViewSet(PublishedViewSet):
    queryset = NewsArticle.objects.all(); serializer_class = NewsArticleSerializer

class GalleryItemViewSet(PublishedViewSet):
    queryset = GalleryItem.objects.all(); serializer_class = GalleryItemSerializer

class PartnerViewSet(PublishedViewSet):
    queryset = Partner.objects.all(); serializer_class = PartnerSerializer

class PartnerStripViewSet(PublishedViewSet):
    queryset = PartnerStrip.objects.all(); serializer_class = PartnerStripSerializer

class VolunteerRoleViewSet(PublishedViewSet):
    queryset = VolunteerRole.objects.all(); serializer_class = VolunteerRoleSerializer

class VolunteerBenefitViewSet(PublishedViewSet):
    queryset = VolunteerBenefit.objects.all(); serializer_class = VolunteerBenefitSerializer

class DonationTierViewSet(PublishedViewSet):
    queryset = DonationTier.objects.all(); serializer_class = DonationTierSerializer

class DonationMethodViewSet(PublishedViewSet):
    queryset = DonationMethod.objects.all(); serializer_class = DonationMethodSerializer

class SuccessStoryViewSet(PublishedViewSet):
    queryset = SuccessStory.objects.all(); serializer_class = SuccessStorySerializer

class ProjectViewSet(PublishedViewSet):
    queryset = Project.objects.all(); serializer_class = ProjectSerializer


# ─── Special views ───────────────────────────────────────────────────────────

@api_view(['GET'])
def about_story(request):
    obj = AboutStory.objects.first()
    if obj: return Response(AboutStorySerializer(obj).data)
    return Response({})

@api_view(['GET'])
def vision_mission_list(request):
    items = VisionMission.objects.all()
    return Response(VisionMissionSerializer(items, many=True).data)

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ['get', 'post']

    def perform_create(self, serializer):
        obj = serializer.save()
        try:
            from .email_utils import send_email, get_smtp_config
            config = get_smtp_config()
            if config and config.username:
                send_email([config.username], f'New Contact: {obj.subject}',
                    f'<h3>New message from {obj.name}</h3><p><b>Email:</b> {obj.email}</p><p><b>Subject:</b> {obj.subject}</p><p>{obj.message}</p>')
        except: pass


@api_view(['POST'])
@permission_classes([AllowAny])
def newsletter_subscribe(request):
    email = request.data.get('email', '').strip()
    name = request.data.get('name', '').strip()
    if not email:
        return Response({'error': 'Email is required'}, status=400)
    sub, created = NewsletterSubscriber.objects.get_or_create(
        email=email, defaults={'name': name, 'subscribed': True})
    if not created and not sub.subscribed:
        sub.subscribed = True; sub.save(); created = True
    return Response({
        'success': True,
        'message': 'Successfully subscribed!' if created else 'You are already subscribed.',
    })


# ─── Admin ViewSets (all items, CRUD) ────────────────────────────────────────

class FullCRUDViewSet(viewsets.ModelViewSet): pass

class AdminStatViewSet(FullCRUDViewSet):
    queryset = Stat.objects.all(); serializer_class = StatSerializer

class AdminHomeHighlightViewSet(FullCRUDViewSet):
    queryset = HomeHighlight.objects.all(); serializer_class = HomeHighlightSerializer

class AdminValueViewSet(FullCRUDViewSet):
    queryset = Value.objects.all(); serializer_class = ValueSerializer

class AdminFocusAreaViewSet(FullCRUDViewSet):
    queryset = FocusArea.objects.all(); serializer_class = FocusAreaSerializer

class AdminTimelineMilestoneViewSet(FullCRUDViewSet):
    queryset = TimelineMilestone.objects.all(); serializer_class = TimelineMilestoneSerializer

class AdminTestimonialViewSet(FullCRUDViewSet):
    queryset = Testimonial.objects.all(); serializer_class = TestimonialSerializer

class AdminProgramViewSet(FullCRUDViewSet):
    queryset = Program.objects.all(); serializer_class = ProgramSerializer
    def perform_create(self, serializer):
        obj = serializer.save()
        try:
            from .email_utils import notify_subscribers
            notify_subscribers(
                f'New Program: {obj.title}',
                f'<h2>{obj.title}</h2><p>{obj.description[:200]}...</p><p>Visit our website to learn more.</p>'
            )
        except: pass

class AdminEventViewSet(FullCRUDViewSet):
    queryset = Event.objects.all(); serializer_class = EventSerializer

class AdminPastEventViewSet(FullCRUDViewSet):
    queryset = PastEvent.objects.all(); serializer_class = PastEventSerializer

class AdminNewsArticleViewSet(FullCRUDViewSet):
    queryset = NewsArticle.objects.all(); serializer_class = NewsArticleSerializer
    def perform_create(self, serializer):
        obj = serializer.save()
        try:
            from .email_utils import notify_subscribers
            notify_subscribers(
                f'New Article: {obj.title}',
                f'<h2>{obj.title}</h2><p>{obj.excerpt[:200]}</p><p>Read the full article on our website.</p>'
            )
        except: pass

class AdminGalleryItemViewSet(FullCRUDViewSet):
    queryset = GalleryItem.objects.all(); serializer_class = GalleryItemSerializer

class AdminPartnerViewSet(FullCRUDViewSet):
    queryset = Partner.objects.all(); serializer_class = PartnerSerializer

class AdminPartnerStripViewSet(FullCRUDViewSet):
    queryset = PartnerStrip.objects.all(); serializer_class = PartnerStripSerializer

class AdminVolunteerRoleViewSet(FullCRUDViewSet):
    queryset = VolunteerRole.objects.all(); serializer_class = VolunteerRoleSerializer

class AdminVolunteerBenefitViewSet(FullCRUDViewSet):
    queryset = VolunteerBenefit.objects.all(); serializer_class = VolunteerBenefitSerializer

class AdminDonationTierViewSet(FullCRUDViewSet):
    queryset = DonationTier.objects.all(); serializer_class = DonationTierSerializer

class AdminDonationMethodViewSet(FullCRUDViewSet):
    queryset = DonationMethod.objects.all(); serializer_class = DonationMethodSerializer

class AdminSuccessStoryViewSet(FullCRUDViewSet):
    queryset = SuccessStory.objects.all(); serializer_class = SuccessStorySerializer

class AdminProjectViewSet(FullCRUDViewSet):
    queryset = Project.objects.all(); serializer_class = ProjectSerializer
    def perform_create(self, serializer):
        obj = serializer.save()
        try:
            from .email_utils import notify_subscribers
            notify_subscribers(
                f'New Project: {obj.title}',
                f'<h2>{obj.title}</h2><p>{obj.description[:200]}</p><p>Visit our website to learn more.</p>'
            )
        except: pass


# ═══════════════════════════════════════════════════════════════
# M-PESA STK PUSH
# ═══════════════════════════════════════════════════════════════
@api_view(['POST'])
@permission_classes([AllowAny])
def mpesa_stk_push(request):
    phone = request.data.get('phone', '').strip()
    amount = request.data.get('amount', '').strip()

    if not phone or not amount:
        return Response({'error': 'Phone and amount are required'}, status=400)

    # Format phone (remove leading 0 or +254, ensure 2547XXXXXXXX)
    phone = phone.replace('+', '').replace(' ', '')
    if phone.startswith('0'): phone = '254' + phone[1:]
    if not phone.startswith('254'): phone = '254' + phone

    try:
        amount_int = int(amount)
        if amount_int < 1: raise ValueError
    except ValueError:
        return Response({'error': 'Invalid amount'}, status=400)

    # Get M-Pesa config
    config = MpesaConfig.objects.first()
    if not config or not config.consumer_key or not config.consumer_secret:
        return Response({'error': 'M-Pesa not configured yet'}, status=500)

    env = config.environment or 'sandbox'
    base_url = 'https://sandbox.safaricom.co.ke' if env == 'sandbox' else 'https://api.safaricom.co.ke'
    shortcode = config.shortcode or '174379'
    passkey = config.passkey or 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
    business_name = config.business_name or 'Beyond Care Initiative'

    # Step 1: Get access token
    try:
        auth = base64.b64encode(f'{config.consumer_key}:{config.consumer_secret}'.encode()).decode()
        token_resp = requests.get(f'{base_url}/oauth/v1/generate?grant_type=client_credentials',
            headers={'Authorization': f'Basic {auth}'}, timeout=10)
        token = token_resp.json().get('access_token')
        if not token:
            return Response({'error': 'Failed to get M-Pesa token', 'detail': token_resp.text}, status=500)
    except Exception as e:
        return Response({'error': f'Token error: {str(e)}'}, status=500)

    # Step 2: Initiate STK Push
    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    pwd = base64.b64encode(f'{shortcode}{passkey}{timestamp}'.encode()).decode()

    stk_payload = {
        'BusinessShortCode': shortcode,
        'Password': pwd,
        'Timestamp': timestamp,
        'TransactionType': 'CustomerPayBillOnline' if shortcode != '174379' else 'CustomerBuyGoodsOnline',
        'Amount': amount_int,
        'PartyA': phone,
        'PartyB': shortcode,
        'PhoneNumber': phone,
        'CallBackURL': request.build_absolute_uri('/api/mpesa-callback/'),
        'AccountReference': f'Donation-{business_name[:12]}',
        'TransactionDesc': f'Donation to {business_name}',
    }

    try:
        stk_resp = requests.post(f'{base_url}/mpesa/stkpush/v1/processrequest',
            json=stk_payload, headers={'Authorization': f'Bearer {token}'}, timeout=10)
        result = stk_resp.json()
        return Response({
            'success': True,
            'message': 'STK Push sent. Check your phone and enter PIN to complete.',
            'mpesa_response': result,
            'checkout_request_id': result.get('CheckoutRequestID', ''),
            'merchant_request_id': result.get('MerchantRequestID', ''),
        })
    except Exception as e:
        return Response({'error': f'STK push error: {str(e)}'}, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def mpesa_callback(request):
    """M-Pesa callback endpoint — logs the transaction result"""
    data = request.data
    print('M-PESA CALLBACK:', data)
    # Store callback in DB or log file
    return Response({'ResultCode': 0, 'ResultDesc': 'Accepted'})

