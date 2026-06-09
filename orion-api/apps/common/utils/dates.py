from calendar import calendar
from datetime import datetime, timedelta

def get_date_range(start_date: datetime, end_date: datetime):
    """Generate a list of dates between start_date and end_date."""
    date_list = []
    current_date = start_date
    while current_date <= end_date:
        date_list.append(current_date)
        current_date += timedelta(days=1)
    return date_list


def get_week_dates(date: datetime):
    """Get the start and end dates of the current week."""
    monday = date - timedelta(days=date.weekday())
    sunday = monday + timedelta(days=6)
    return monday, sunday


def get_previous_week_dates():
    """Get the start and end dates of the previous week."""
    today = datetime.now()
    monday_previous_week, _ = get_week_dates(today - timedelta(days=7))
    return monday_previous_week, today - timedelta(days=today.weekday() + 1)


def get_next_week_dates():
    """Get the start and end dates of the next week."""
    today = datetime.now()
    _, sunday_next_week = get_week_dates(today + timedelta(days=7))
    return today + timedelta(days=today.weekday() + 1), sunday_next_week


def get_month_dates(date: datetime):
    """Get the start and end dates of the current month."""
    first_day = date.replace(day=1)
    last_day = first_day + timedelta(days=calendar.monthrange(date.year, date.month)[1] - 1)
    return first_day, last_day