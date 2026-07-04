from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed

from .models import Users


class UsersJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):

        header = self.get_header(request)

        print("HEADER =", header)

        if header is None:
            return None

        raw_token = self.get_raw_token(header)

        print("RAW TOKEN =", raw_token)

        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)

        print("TOKEN =", validated_token)

        user_id = validated_token.get("user_id")

        print("USER_ID =", user_id)

        try:
            user = Users.objects.get(pk=user_id)
        except Users.DoesNotExist:
            raise AuthenticationFailed("User not found")

        return (user, validated_token)