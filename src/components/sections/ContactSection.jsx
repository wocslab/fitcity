import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ firstName: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const body = new URLSearchParams();
      body.append("FirstName",      form.firstName);
      body.append("CustomerEmail",  form.email);
      body.append("CustomerMobile", form.phone);
      body.append("Notes",          form.message);
      body.append("EntryPoint",     "WEB");

      const res = await fetch(
        "https://www.yourdigitallift.com/api/v1/website-customer-register/",
        {
          method: "POST",
          headers: {
            Authorization: "CD2atnF9G7ZEy1nUC70LFLFom8WPICeC95zaBc8kYPM=",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        setStatus("success");
        setForm({ firstName: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClass =
    "w-full bg-[#222222] text-white text-sm placeholder-gray-500 px-4 py-3 focus:outline-none focus:bg-[#2a2a2a] transition-all duration-200 border-0 rounded-lg";

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute -top-40 right-20 w-96 h-96 rounded-full bg-red-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start mb-14">

          {/* LEFT — info */}
          <div>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-red-600 rounded-full" />
                <span className="title-gotham text-red-500 text-xs font-semibold tracking-[0.3em] uppercase">
                  Get In Touch
                </span>
              </div>
              <h2 className="title-gotham text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
                We'd Love to Hear{" "}
                <span className="text-red-500">From You</span>
              </h2>
            </div>

            <div className="space-y-6">
              {[
                { Icon: Phone,  label: "+91 98765 43210",                               href: "tel:+919876543210" },
                { Icon: Mail,   label: "hello@fitcity.com",                             href: "mailto:hello@fitcity.com" },
                { Icon: MapPin, label: "Al Hamra Industrial Area, Ras Al Khaimah, UAE", href: "#" },
              ].map((item) => {
                const Icon = item.Icon;
                return (
                  <a key={item.label} href={item.href} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-red-600/10 border border-red-600/20
                      flex items-center justify-center shrink-0
                      group-hover:bg-red-600 group-hover:border-red-600
                      transition-all duration-300">
                      <Icon size={16} className="text-red-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="title-gotham text-gray-400 text-sm leading-relaxed pt-2
                      group-hover:text-white transition-colors duration-200">
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT — form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[8px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px]">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className={inputClass}
              />
              <textarea
                placeholder="Message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputClass + " resize-none"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className={`
                  title-gotham w-full flex items-center justify-center gap-3
                  py-4 rounded-lg font-bold tracking-[0.22em] uppercase text-sm
                  transition-all duration-300 active:scale-[0.99]
                  ${status === "success"
                    ? "bg-green-600 text-white"
                    : status === "error"
                    ? "bg-red-900 text-white"
                    : "bg-red-600 hover:bg-red-500 text-white"
                  }
                `}
              >
                {status === "loading" && (
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                {status === "idle"    && <><Send size={14} /> Send Message</>}
                {status === "loading" && "Sending..."}
                {status === "success" && "✓ Message Sent!"}
                {status === "error"   && "Failed — Try Again"}
              </button>
            </form>
          </div>
        </div>

        {/* FULL WIDTH MAP */}
        <div className="relative h-72 sm:h-96 overflow-hidden border border-white/10 rounded-xl">
          <iframe
            title="Fit City Gym Location"
            src="https://www.google.com/maps?q=Al+Hamra+Industrial+Area+Ras+Al+Khaimah+UAE&output=embed"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
            style={{
              filter: "invert(92%) hue-rotate(180deg) saturate(0.3) brightness(0.6)",
            }}
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          {/* Pin card */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3
            bg-black/85 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 pointer-events-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600/20 border border-red-600/30 shrink-0">
              <MapPin size={15} className="text-red-500" />
            </div>
            <div>
              <p className="title-gotham text-white text-xs font-bold">Fit City Gym</p>
              <p className="title-gotham text-gray-400 text-[10px]">Ras Al Khaimah, UAE</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}