
# generic common validators for all apps

from django.core.validators import RegexValidator, EmailValidator, MinLengthValidator, MaxLengthValidator

def validate_phone_number(value):
    # phone number french format: +33 6 12 34 56 78 or 0612345678
    return RegexValidator(regex=r'^\+?33[1-9]\d{8}$|^0[1-9]\d{8}$', message="Phone number must be entered in the format: '+33 6 12 34 56 78' or '0612345678'.")(value)

def validate_email(value):
    # email validator
    return EmailValidator()(value)


def validate_password(value):
    MinLengthValidator(8)(value)
    MaxLengthValidator(128)(value)
