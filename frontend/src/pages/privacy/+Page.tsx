import React from "react";

const PrivacyPolicy: React.FC = () => (
    <div className="max-w-screen-lg px-3">
        <h1 className="text-2xl font-semibold text-white pt-6">
            RunEmu Privacy Statement
        </h1>
        <p className="py-4">
            <strong>Effective Date:</strong> December 22, 2024
        </p>

        <p>
            At RunEmu.com, we are committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and safeguard your
            personal information when you use our race directory website (the
            "Service"). By using the Service, you agree to the practices
            outlined in this Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold text-white pt-5">
            Information We Collect
        </h2>
        <p className="pt-3">
            Personal Data is collected from you directly, automatically from
            your device, and from third parties. Below, we detail the
            information we collect through various methods.
        </p>

        <h3 className="font-semibold text-white pt-3">From You</h3>
        <ul className="list-disc px-6">
            <li>
                <strong>Account Information:</strong> If you create an account,
                we may collect your name, email address, password, and optional
                profile details.
            </li>
            <li>
                <strong>Race Preferences:</strong> If you use search or
                filtering features, we may collect information about your
                preferences (e.g., race type, location).
            </li>
        </ul>

        <h3 className="font-semibold text-white pt-3">Automatically</h3>
        <ul className="list-disc px-6">
            <li>
                <strong>Device Information:</strong> Includes your IP address,
                browser type, operating system, and device type.
            </li>
            <li>
                <strong>Usage Data:</strong> Includes information about your
                interactions with the Service, such as pages viewed, clicks, and
                search queries.
            </li>
            <li>
                <strong>Cookies and Tracking Technologies:</strong> We use
                cookies and similar technologies to enhance your experience and
                analyze website usage. For details, see our{" "}
                <a href="/cookie-policy">Cookie Policy</a>.
            </li>
            <li>
                <strong>Location-Based Data:</strong> We may estimate your
                location based on your IP address to provide relevant race
                recommendations and advertising.
            </li>
        </ul>

        <h3 className="font-semibold text-white pt-3">Third-Party Data</h3>
        <ul className="list-disc px-6">
            <li>
                If you connect your account with third-party services such as
                Gmail, Apple, or Strava, we may collect information as permitted
                by those services (e.g., name, email address).
            </li>
        </ul>

        <h2 className="text-xl font-semibold text-white pt-5">
            How We Use Your Information
        </h2>
        <ul className="list-disc px-6">
            <li>Provide and improve the Service.</li>
            <li>
                Customize your experience, including recommending races and
                targeted advertising based on your location.
            </li>
            <li>
                Communicate with you about updates, promotional offers, or
                customer support inquiries.
            </li>
            <li>
                Analyze website usage and performance to enhance functionality.
            </li>
            <li>Ensure security and prevent fraud.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white pt-5">
            Sharing Your Information
        </h2>
        <p className="pt-3">
            RunEmu will never sell your data to anyone. Your data will be shared
            only under the circumstances detailed below.
        </p>

        <h3 className="font-semibold text-white pt-3">With Your Consent</h3>
        <p>
            If you authorize us to share your data with third parties for
            specific purposes.
        </p>

        <h3 className="font-semibold text-white pt-3">Service Providers</h3>
        <p>
            We may share information with third-party vendors who assist in
            operating the Service (e.g., hosting, analytics, email
            communication).
        </p>

        <h3 className="font-semibold text-white pt-3">Legal Obligations</h3>
        <p>
            We may disclose information if required by law or to protect our
            legal rights.
        </p>

        <h3 className="font-semibold text-white pt-3">Business Transfers</h3>
        <p>
            If RunEmu.com is involved in a merger, acquisition, or sale of
            assets, your information may be transferred as part of the
            transaction.
        </p>

        <h2 className="text-xl font-semibold text-white pt-5">
            Your Rights and Choices
        </h2>

        <h3 className="font-semibold text-white pt-3">Access and Update</h3>
        <p>
            You can access and update your personal information by logging into
            your account or contacting us.
        </p>

        <h3 className="font-semibold text-white pt-3">Delete Your Data</h3>
        <p>
            You may request that we delete your account and associated data,
            subject to legal or operational requirements.
        </p>

        <h3 className="font-semibold text-white pt-3">
            Opt-Out of Communications
        </h3>
        <p>
            You can unsubscribe from promotional emails by clicking the
            "unsubscribe" link in the email.
        </p>

        <h3 className="font-semibold text-white pt-3">Manage Cookies</h3>
        <p>
            You can adjust your browser settings to refuse cookies or alert you
            when cookies are being used.
        </p>

        <h2 className="text-xl font-semibold text-white pt-5">Security</h2>
        <p>
            We use industry-standard security measures to protect your
            information. However, no system is entirely secure, and we cannot
            guarantee absolute security.
        </p>

        <h2 className="text-xl font-semibold text-white pt-5">
            Children's Privacy
        </h2>
        <p>
            The Service is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children. If we
            discover that we have inadvertently collected information from a
            child, we will delete it promptly.
        </p>

        <h2 className="text-xl font-semibold text-white pt-5">
            Changes to This Privacy Policy
        </h2>
        <p>
            We may update this Privacy Policy from time to time. We will notify
            you of significant changes by posting a notice on the Service or
            emailing you.
        </p>

        <h2 className="text-xl font-semibold text-white pt-5">Contact Us</h2>
        <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
        </p>
        <address>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@RunEmu.com">support@RunEmu.com</a>
        </address>
    </div>
);

export default PrivacyPolicy;
