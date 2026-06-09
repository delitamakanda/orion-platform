from rest_framework.response import Response

class GenericResponse(Response):
    def __init__(self, data=None, status=None, message=None, **kwargs):
        response_data = {
            'status': status if status is not None else self.status_code,
            'message': message,
            'data': data
        }
        super().__init__(data=response_data, status=status, **kwargs)
