export default function Footer() {
  const policyLinks = [
    { label: "Acceptable Use Policy", href: "/acceptable-use-policy" },
    { label: "Compliance Statement", href: "/compliance-statement" },
    { label: "Consumer Dispute Resolution & Complaints", href: "/consumer-dispute-resolution-complaints" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Refund Policy", href: "/refund-policy" }
  ];

  const serviceLinks = [
    { label: "Backups", href: "/Documentations" },
    { label: "Monitoring", href: "/data-center" },
    { label: "Server Rental", href: "/pricing" }
  ];

  const companyLinks = [
    { label: "Home", href: "/#top" },
    { label: "Pricing", href: "/pricing" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/data-center" },
    { label: "Contact Us", href: "#" }
  ];

  return (
    <footer className="w-full bg-black border-t border-gray-800 text-gray-400 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Kerny</h3>
            <div className="space-y-2 text-sm mb-6">
              <p><strong>Name:</strong> Kerny (Gridlogic OÜ)</p>
              <p><strong>Country:</strong> Estonia</p>
              <p><strong>Registration Nr:</strong> 17504584</p>
              <p><strong>Address:</strong> Harju maakond, Tallinn, Kesklinna linnaosa, Tatari tn 56, 10134</p>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-xs">Payment Methods:</span>
              <div className="flex gap-2">
                <span className="w-6 h-4 bg-gray-700 rounded text-xs flex items-center justify-center">💳</span>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition">
              Cookie settings
            </button>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  {link.label === "Contact Us" ? (
                    <button className="hover:text-white transition">
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.href} className="hover:text-white transition">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-sm text-center">
            © Kerny 2026. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
