"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomMessage {
    constructor(props) {
        this.FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
        this.userAttributes = props.userAttributes;
        this.codeParameter = props.codeParameter;
        this.usernameParameter = props.usernameParameter;
        this.FRONTEND_LINKS = {
            SEND_CODE_POST_SIGN_UP: `${this.FRONTEND_BASE_URL}/auth/complete-registration?code=${this.codeParameter}&email=${this.userAttributes.email}`,
            SEND_CODE_FORGOT_PASSWORD: `${this.FRONTEND_BASE_URL}/auth/complete-password-reset?code=${this.codeParameter}&email=${this.userAttributes.email}`,
            SEND_CODE_VERIFY_NEW_EMAIL: `${this.FRONTEND_BASE_URL}/auth/complete-password-reset?code=${this.codeParameter}&email=${this.userAttributes.email}`,
            SEND_TEMPORARY_PASSWORD: `${this.FRONTEND_BASE_URL}/auth/login`,
            RESEND_CONFIRMATION_CODE: `${this.FRONTEND_BASE_URL}/auth/complete-registration?code=${this.codeParameter}&email=${this.userAttributes.email}`,
        };
    }
    sendCodePostSignUp() {
        return {
            emailSubject: `Validate your account for ${this.FRONTEND_BASE_URL} | ${new Date().toLocaleString()}`,
            emailMessage: `Hi <b>${this.userAttributes.given_name} ${this.userAttributes.family_name}</b>!<br>Thank you for signing up.
      <br />
      Please click on the link to activate your account: <a href="${this.FRONTEND_LINKS.SEND_CODE_POST_SIGN_UP}">${this.FRONTEND_BASE_URL}</a>.
      `,
        };
    }
}
exports.default = CustomMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLW1lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXN0b20tbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWlCQSxNQUFNLGFBQWE7SUFtQmpCLFlBQVksS0FBeUI7UUFsQnJDLHNCQUFpQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUE7UUFtQi9DLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQTtRQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUE7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQTtRQUVoRCxJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ3BCLHNCQUFzQixFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixvQ0FBb0MsSUFBSSxDQUFDLGFBQWEsVUFBVSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtZQUM1SSx5QkFBeUIsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsc0NBQXNDLElBQUksQ0FBQyxhQUFhLFVBQVUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7WUFDakosMEJBQTBCLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLHNDQUFzQyxJQUFJLENBQUMsYUFBYSxVQUFVLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO1lBQ2xKLHVCQUF1QixFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixhQUFhO1lBQy9ELHdCQUF3QixFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixvQ0FBb0MsSUFBSSxDQUFDLGFBQWEsVUFBVSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtTQUMvSSxDQUFBO0lBQ0gsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPO1lBQ0wsWUFBWSxFQUFFLDZCQUE2QixJQUFJLENBQUMsaUJBQWlCLE1BQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUNwRyxZQUFZLEVBQUUsU0FBUyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVc7O29FQUUxQixJQUFJLENBQUMsY0FBYyxDQUFDLHNCQUFzQixLQUFLLElBQUksQ0FBQyxpQkFBaUI7T0FDbEk7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBRUQsa0JBQWUsYUFBYSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsidHlwZSBDdXN0b21NZXNzYWdlUmV0dXJuVmFsdWUgPSB7XG4gIGVtYWlsU3ViamVjdDogc3RyaW5nXG4gIGVtYWlsTWVzc2FnZTogc3RyaW5nXG59XG5cbnR5cGUgQ3VzdG9tTWVzc2FnZVByb3BzID0ge1xuICBjb2RlUGFyYW1ldGVyOiBzdHJpbmdcbiAgdXNlckF0dHJpYnV0ZXM6IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgZ2l2ZW5fbmFtZTogc3RyaW5nXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIGZhbWlseV9uYW1lOiBzdHJpbmdcbiAgICBlbWFpbDogc3RyaW5nXG4gIH1cbiAgdXNlcm5hbWVQYXJhbWV0ZXI6IHN0cmluZ1xufVxuXG5jbGFzcyBDdXN0b21NZXNzYWdlIHtcbiAgRlJPTlRFTkRfQkFTRV9VUkwgPSBwcm9jZXNzLmVudi5GUk9OVEVORF9CQVNFX1VSTFxuICBGUk9OVEVORF9MSU5LUzoge1xuICAgIFNFTkRfQ09ERV9QT1NUX1NJR05fVVA6IHN0cmluZ1xuICAgIFNFTkRfQ09ERV9GT1JHT1RfUEFTU1dPUkQ6IHN0cmluZ1xuICAgIFNFTkRfQ09ERV9WRVJJRllfTkVXX0VNQUlMOiBzdHJpbmdcbiAgICBTRU5EX1RFTVBPUkFSWV9QQVNTV09SRDogc3RyaW5nXG4gICAgUkVTRU5EX0NPTkZJUk1BVElPTl9DT0RFOiBzdHJpbmdcbiAgfVxuICBwcml2YXRlIHVzZXJBdHRyaWJ1dGVzOiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIGdpdmVuX25hbWU6IHN0cmluZ1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICBmYW1pbHlfbmFtZTogc3RyaW5nXG4gICAgZW1haWw6IHN0cmluZ1xuICB9XG4gIHByaXZhdGUgcmVhZG9ubHkgY29kZVBhcmFtZXRlcjogc3RyaW5nXG4gIHByaXZhdGUgdXNlcm5hbWVQYXJhbWV0ZXI6IHN0cmluZ1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBDdXN0b21NZXNzYWdlUHJvcHMpIHtcbiAgICB0aGlzLnVzZXJBdHRyaWJ1dGVzID0gcHJvcHMudXNlckF0dHJpYnV0ZXNcbiAgICB0aGlzLmNvZGVQYXJhbWV0ZXIgPSBwcm9wcy5jb2RlUGFyYW1ldGVyXG4gICAgdGhpcy51c2VybmFtZVBhcmFtZXRlciA9IHByb3BzLnVzZXJuYW1lUGFyYW1ldGVyXG5cbiAgICB0aGlzLkZST05URU5EX0xJTktTID0ge1xuICAgICAgU0VORF9DT0RFX1BPU1RfU0lHTl9VUDogYCR7dGhpcy5GUk9OVEVORF9CQVNFX1VSTH0vYXV0aC9jb21wbGV0ZS1yZWdpc3RyYXRpb24/Y29kZT0ke3RoaXMuY29kZVBhcmFtZXRlcn0mZW1haWw9JHt0aGlzLnVzZXJBdHRyaWJ1dGVzLmVtYWlsfWAsXG4gICAgICBTRU5EX0NPREVfRk9SR09UX1BBU1NXT1JEOiBgJHt0aGlzLkZST05URU5EX0JBU0VfVVJMfS9hdXRoL2NvbXBsZXRlLXBhc3N3b3JkLXJlc2V0P2NvZGU9JHt0aGlzLmNvZGVQYXJhbWV0ZXJ9JmVtYWlsPSR7dGhpcy51c2VyQXR0cmlidXRlcy5lbWFpbH1gLFxuICAgICAgU0VORF9DT0RFX1ZFUklGWV9ORVdfRU1BSUw6IGAke3RoaXMuRlJPTlRFTkRfQkFTRV9VUkx9L2F1dGgvY29tcGxldGUtcGFzc3dvcmQtcmVzZXQ/Y29kZT0ke3RoaXMuY29kZVBhcmFtZXRlcn0mZW1haWw9JHt0aGlzLnVzZXJBdHRyaWJ1dGVzLmVtYWlsfWAsXG4gICAgICBTRU5EX1RFTVBPUkFSWV9QQVNTV09SRDogYCR7dGhpcy5GUk9OVEVORF9CQVNFX1VSTH0vYXV0aC9sb2dpbmAsXG4gICAgICBSRVNFTkRfQ09ORklSTUFUSU9OX0NPREU6IGAke3RoaXMuRlJPTlRFTkRfQkFTRV9VUkx9L2F1dGgvY29tcGxldGUtcmVnaXN0cmF0aW9uP2NvZGU9JHt0aGlzLmNvZGVQYXJhbWV0ZXJ9JmVtYWlsPSR7dGhpcy51c2VyQXR0cmlidXRlcy5lbWFpbH1gLFxuICAgIH1cbiAgfVxuXG4gIHNlbmRDb2RlUG9zdFNpZ25VcCgpOiBDdXN0b21NZXNzYWdlUmV0dXJuVmFsdWUge1xuICAgIHJldHVybiB7XG4gICAgICBlbWFpbFN1YmplY3Q6IGBWYWxpZGF0ZSB5b3VyIGFjY291bnQgZm9yICR7dGhpcy5GUk9OVEVORF9CQVNFX1VSTH0gfCAke25ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKX1gLFxuICAgICAgZW1haWxNZXNzYWdlOiBgSGkgPGI+JHt0aGlzLnVzZXJBdHRyaWJ1dGVzLmdpdmVuX25hbWV9ICR7dGhpcy51c2VyQXR0cmlidXRlcy5mYW1pbHlfbmFtZX08L2I+ITxicj5UaGFuayB5b3UgZm9yIHNpZ25pbmcgdXAuXG4gICAgICA8YnIgLz5cbiAgICAgIFBsZWFzZSBjbGljayBvbiB0aGUgbGluayB0byBhY3RpdmF0ZSB5b3VyIGFjY291bnQ6IDxhIGhyZWY9XCIke3RoaXMuRlJPTlRFTkRfTElOS1MuU0VORF9DT0RFX1BPU1RfU0lHTl9VUH1cIj4ke3RoaXMuRlJPTlRFTkRfQkFTRV9VUkx9PC9hPi5cbiAgICAgIGAsXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEN1c3RvbU1lc3NhZ2VcbiJdfQ==