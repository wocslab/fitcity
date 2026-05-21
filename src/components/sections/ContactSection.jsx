import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSent(true);

    setTimeout(() => setSent(false), 3000);

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -top-40 right-20 w-96 h-96 rounded-full bg-brand-red/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
          {/* ================= LEFT INFO ================= */}
          <div className="reveal-left">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-brand-red rounded-full" />

                <span className="text-brand-red text-xs font-semibold tracking-[0.3em] uppercase">
                  Get In Touch
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-5xl font-black leading-tight text-white">
                We'd Love to Hear{" "}
                <span className="text-brand-red">From You</span>
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  Icon: Phone,
                  label: "+91 98765 43210",
                  href: "tel:+919876543210",
                },

                {
                  Icon: Mail,
                  label: "hello@fitcity.com",
                  href: "mailto:hello@fitcity.com",
                },

                {
                  Icon: MapPin,
                  label: "Al Hamra Industrial Area, Ras Al Khaimah, UAE",
                  href: "#",
                },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="w-10 h-10 bg-brand-red/10 border border-brand-red/20
                    flex items-center justify-center shrink-0
                    group-hover:bg-brand-red group-hover:border-brand-red
                    transition-all duration-300"
                  >
                    <Icon
                      size={16}
                      className="text-brand-red group-hover:text-white transition-colors duration-300"
                    />
                  </div>

                  <span
                    className="text-gray-400 text-sm leading-relaxed pt-2
                    group-hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="reveal-right">
            <form
              onSubmit={handleSubmit}
              className="bg-brand-dark-3 border border-white/5 p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                    className="w-full bg-brand-dark border border-white/10 text-white
                    placeholder-gray-500 px-4 py-3 text-sm
                    focus:outline-none focus:border-brand-red
                    transition-colors duration-200"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    className="w-full bg-brand-dark border border-white/10 text-white
                    placeholder-gray-500 px-4 py-3 text-sm
                    focus:outline-none focus:border-brand-red
                    transition-colors duration-200"
                  />
                </div>
              </div>

              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                className="w-full bg-brand-dark border border-white/10 text-white
                placeholder-gray-500 px-4 py-3 text-sm
                focus:outline-none focus:border-brand-red
                transition-colors duration-200"
              />

              <textarea
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
                className="w-full bg-brand-dark border border-white/10 text-white
                placeholder-gray-500 px-4 py-3 text-sm
                focus:outline-none focus:border-brand-red
                transition-colors duration-200 resize-none"
              />

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-3
                py-4 bg-brand-red text-white font-display tracking-widest uppercase text-sm
                hover:bg-brand-red-dark transition-colors duration-300"
              >
                {sent ? (
                  "Message Sent! ✓"
                ) : (
                  <>
                    Send Message

                    <Send
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ================= FULL WIDTH MAP ================= */}
          <div className="lg:col-span-2">
            <div className="relative h-72 sm:h-96 rounded-md  overflow-hidden border border-white/10">
              <iframe
                title="Fit City Gym Location"
                src="https://www.google.com/maps?q=Al+Hamra+Industrial+Area+Ras+Al+Khaimah+UAE&output=embed"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />

              {/* Location Card */}
              {/* <div
                className="absolute bottom-4 left-4 right-4 rounded-2xl
                border border-white/10 bg-black/70 backdrop-blur-md p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl
                    bg-brand-red/20 border border-brand-red/20"
                  >
                    <MapPin size={18} className="text-brand-red" />
                  </div>

                  <div>
                    <p className="text-white text-sm font-semibold">
                      Fit City Gym
                    </p>

                    <p className="text-gray-400 text-xs">
                      Ras Al Khaimah, UAE
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {/* ================= END MAP ================= */}
        </div>
      </div>
    </section>
  );
}