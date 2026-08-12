import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.conf import settings

def get_smtp_config():
    from cms.models import SmtpConfig
    return SmtpConfig.objects.first()

def send_email(to_emails: list[str], subject: str, html_body: str):
    config = get_smtp_config()
    if not config or not config.username or not config.password:
        print("SMTP not configured, skipping email")
        return False

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = f"{config.from_name} <{config.from_email or config.username}>"
    msg['To'] = ', '.join(to_emails)
    msg.attach(MIMEText(html_body, 'html'))

    try:
        server = smtplib.SMTP(config.host, config.port, timeout=15)
        server.ehlo()
        if config.use_tls:
            server.starttls()
            server.ehlo()
        server.login(config.username, config.password)
        server.sendmail(msg['From'], to_emails, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

def notify_subscribers(subject: str, html_body: str):
    from cms.models import NewsletterSubscriber
    subscribers = list(NewsletterSubscriber.objects.filter(subscribed=True).values_list('email', flat=True))
    if not subscribers:
        return
    # Send in batches of 50
    for i in range(0, len(subscribers), 50):
        batch = subscribers[i:i+50]
        send_email(batch, subject, html_body)
