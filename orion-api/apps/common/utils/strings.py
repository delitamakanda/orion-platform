# generate string utilities
def truncate_string(input_string, max_length):
    if len(input_string) > max_length:
        return input_string[:max_length] + "..."
    return input_string

# generate a random password
def generate_random_password(length=12):
    import random
    import string
    return ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits + string.punctuation, k=length))