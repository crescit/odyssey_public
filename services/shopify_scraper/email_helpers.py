import base64
from googleapiclient.discovery import build
from email.mime.text import MIMEText
from google.oauth2 import service_account
import json

def get_gmail_service():
  #https://medium.com/lyfepedia/sending-emails-with-gmail-api-and-python-49474e32c81f
  SCOPES = ['https://www.googleapis.com/auth/gmail.send']
  SERVICE_ACCOUNT_FILE = "servicekey.json"
  #credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
  service_account_info = json.load(open(SERVICE_ACCOUNT_FILE))
  credentials = service_account.Credentials.from_service_account_info(service_account_info, scopes=SCOPES, subject='odysseycommerce@gmail.com')
  delegated_credentials = credentials.with_subject("odysseycommerce@gmail.com")
  service = build('gmail', 'v1', credentials=delegated_credentials)
  return service

def send_message(service, user_id, message):
  """Send an email message.

  Args:
    service: Authorized Gmail API service instance.
    user_id: User's email address. The special value "me"
    can be used to indicate the authenticated user.
    message: Message to be sent.

  Returns:
    Sent Message.
  """
  raw = base64.urlsafe_b64encode(message.as_bytes())
  raw = raw.decode()
  body = {'raw': raw}
  message = (service.users().messages().send(userId=user_id, body=body).execute())
  return

def send_test_email(body):
  emailPath = "templates/test_email.html"
  template = open(emailPath, "r")
  mime_message = MIMEText(template.read(), 'html')
  mime_message['to'] = body.get("email")
  mime_message['from'] = "odysseycommerce@gmail.com"
  mime_message['subject'] = "GREAT SUCCESS"
  send_message(get_gmail_service(), "me", mime_message)
  return
