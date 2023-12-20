function PrivacyPolicyView() {
  return (
    <div className="w-full max-w-6xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">
        Privacy Policy for <strong>FirePins</strong>
      </h1>
      <p className="mb-2">
        <strong>Effective Date:</strong> 2023-12-20
      </p>

      {/* Intro */}
      <h2 className="text-lg font-semibold mt-4 mb-2">Introduction</h2>
      <p className="mb-4">
        Welcome to <strong>FirePins</strong>, a platform where movie enthusiasts
        can share their favorite or latest watched movies. This Privacy Policy
        outlines our practices regarding the collection, use, and sharing of
        your information.
      </p>

      {/* Information Collection */}
      <h2 className="text-lg font-semibold mt-4 mb-2">
        Information Collection
      </h2>
      <p className="mb-4">
        When you sign up using Google's single sign-on service, we collect the
        following information:
      </p>
      <ul className="list-disc ml-5 mb-4">
        <li>Your name</li>
        <li>Your profile picture URL</li>
        <li>Your user ID (provided by Google)</li>
      </ul>

      {/* Use of Information */}
      <h2 className="text-lg font-semibold mt-4 mb-2">Use of Information</h2>
      <p className="mb-4">
        The information we collect is used for the following purposes:
      </p>
      <ul className="list-disc ml-5 mb-4">
        <li>To create and manage your user account</li>
        <li>To personalize your experience on our platform</li>
        <li>To communicate with you regarding our service</li>
      </ul>

      {/* Data Storage and Security */}
      <h2 className="text-lg font-semibold mt-4 mb-2">
        Data Storage and Security
      </h2>
      <p className="mb-4">
        We take reasonable measures to protect the information we collect from
        unauthorized access, disclosure, alteration, and destruction. However,
        please be aware that no security measures are perfect or impenetrable.
      </p>

      {/* Sharing of Information */}
      <h2 className="text-lg font-semibold mt-4 mb-2">
        Sharing of Information
      </h2>
      <p className="mb-4">
        We do not share your personal information with third parties, except as
        required by law or to protect our rights.
      </p>

      {/* Third-Party Services */}
      <h2 className="text-lg font-semibold mt-4 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        We use TMDB API to retrieve movie information. TMDB API is governed by
        their own privacy policy, which can be found{" "}
        <a
          href="https://www.themoviedb.org/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>

      <h2 className="text-lg font-semibold mt-4 mb-2">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us.
      </p>
    </div>
  );
}

export default PrivacyPolicyView;
