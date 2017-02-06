# OAuth 2.0 Implicit Flow Demo

# Author
* Eberhard Felix

# Demo
https://feberhard.github.io/OAuth2ImplicitFlow/

1. Acquire an access token. To do that click on Generate Sign In Link and click on that link.
2. After you got the token as a result you can validate it.
3. You can try to access your Google Drive files but it will fail cause of missing permissions.
4. Generate a link to get permissions to Google Drive metadata and click it.
    * You can again validate the token to see the changed scope.
5. Try again to list the files in your Google Drive.
6. Generate a link to revoke the access token and click it.
    * If you validate the token now, you shouldn't be authenticated anymore.