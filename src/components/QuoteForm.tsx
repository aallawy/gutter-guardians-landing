import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

const quoteSchema = z.object({
  home_stories: z.enum(["1-story", "2-story", "3-story"]),
  home_size: z.string().trim().min(1, "Please enter the size of your home").max(100),
  gutter_issues: z.enum(["yes", "no", "not_sure"]),
  service_interest: z.enum(["clean_seal", "gutter_guard", "not_sure"]),
  downspout_issues: z.enum(["yes", "no", "not_sure"]),
  name: z.string().trim().min(1, "Name is required").max(100),
  address: z.string().trim().min(1, "Address is required").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const initialState: QuoteFormData = {
  home_stories: "1-story",
  home_size: "",
  gutter_issues: "no",
  service_interest: "clean_seal",
  downspout_issues: "no",
  name: "",
  address: "",
  phone: "",
  email: "",
};

export function QuoteForm() {
  const [data, setData] = useState<QuoteFormData>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const parsed = quoteSchema.safeParse(data);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      toast.error(first?.message ?? "Please complete the form");
      setSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("quote_requests").insert({
        home_stories: parsed.data.home_stories,
        home_size: parsed.data.home_size,
        gutter_issues: parsed.data.gutter_issues,
        service_interest: parsed.data.service_interest,
        downspout_issues: parsed.data.downspout_issues,
        name: parsed.data.name,
        address: parsed.data.address,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
      });

      if (error) throw error;

      // Trigger email notification (fire-and-forget; submission already saved)
      fetch("/api/public/quote-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      }).catch(() => {
        // Silent: lead is already in DB
      });

      setSuccess(true);
    } catch (err) {
      console.error("Quote submission failed", err);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-card rounded-2xl p-8 md:p-12 border border-border text-center" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground">Your message has been received</h3>
        <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
          Thank you for reaching out to Allawy Solutions. A member of our team will contact you within the next <strong className="text-foreground">24 hours</strong> to discuss your quote.
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setData(initialState);
            setSuccess(false);
          }}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card rounded-2xl p-6 md:p-10 border border-border space-y-7 text-left"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Stories */}
      <div className="space-y-3">
        <Label className="text-foreground font-semibold">Is the house 1-story (bungalow), 2-story, or 3-story?</Label>
        <RadioGroup
          value={data.home_stories}
          onValueChange={(v) => update("home_stories", v as QuoteFormData["home_stories"])}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2"
        >
          {[
            { v: "1-story", l: "1-story (Bungalow)" },
            { v: "2-story", l: "2-story" },
            { v: "3-story", l: "3-story" },
          ].map((o) => (
            <label
              key={o.v}
              className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <RadioGroupItem value={o.v} id={`s-${o.v}`} />
              <span className="text-sm font-medium text-foreground">{o.l}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Size */}
      <div className="space-y-3">
        <Label htmlFor="home_size" className="text-foreground font-semibold">
          Approximately, what is the size of the home?
        </Label>
        <Input
          id="home_size"
          placeholder="e.g. 2,000 sq ft or 50 ft frontage"
          value={data.home_size}
          onChange={(e) => update("home_size", e.target.value)}
          className="h-11"
          maxLength={100}
        />
      </div>

      {/* Active issues */}
      <div className="space-y-3">
        <Label className="text-foreground font-semibold">
          Are you experiencing active leaks, overflowing, or sagging gutters?
        </Label>
        <RadioGroup
          value={data.gutter_issues}
          onValueChange={(v) => update("gutter_issues", v as QuoteFormData["gutter_issues"])}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2"
        >
          {[
            { v: "yes", l: "Yes" },
            { v: "no", l: "No" },
            { v: "not_sure", l: "Not sure" },
          ].map((o) => (
            <label
              key={o.v}
              className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <RadioGroupItem value={o.v} id={`g-${o.v}`} />
              <span className="text-sm font-medium text-foreground">{o.l}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Service interest */}
      <div className="space-y-3">
        <Label className="text-foreground font-semibold">
          Are you interested in a one-time tune-up or a permanent solution?
        </Label>
        <RadioGroup
          value={data.service_interest}
          onValueChange={(v) => update("service_interest", v as QuoteFormData["service_interest"])}
          className="grid grid-cols-1 gap-2"
        >
          {[
            { v: "clean_seal", l: "One-time tune-up (Clean, Seal & Reinforce)" },
            { v: "gutter_guard", l: "Permanent solution (Gutter Guard Installation — includes free CSR)" },
            { v: "not_sure", l: "Not sure — need a recommendation" },
          ].map((o) => (
            <label
              key={o.v}
              className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <RadioGroupItem value={o.v} id={`si-${o.v}`} />
              <span className="text-sm font-medium text-foreground">{o.l}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Downspouts */}
      <div className="space-y-3">
        <Label className="text-foreground font-semibold">
          Do you have any downspouts that are disconnected or need to be redirected away from the foundation?
        </Label>
        <RadioGroup
          value={data.downspout_issues}
          onValueChange={(v) => update("downspout_issues", v as QuoteFormData["downspout_issues"])}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2"
        >
          {[
            { v: "yes", l: "Yes" },
            { v: "no", l: "No" },
            { v: "not_sure", l: "Not sure" },
          ].map((o) => (
            <label
              key={o.v}
              className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <RadioGroupItem value={o.v} id={`d-${o.v}`} />
              <span className="text-sm font-medium text-foreground">{o.l}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Contact info */}
      <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-border">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name" className="text-foreground font-semibold">Full name</Label>
          <Input id="name" value={data.name} onChange={(e) => update("name", e.target.value)} className="h-11" maxLength={100} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="address" className="text-foreground font-semibold">Property address</Label>
          <Textarea
            id="address"
            value={data.address}
            onChange={(e) => update("address", e.target.value)}
            className="min-h-[64px]"
            maxLength={255}
            placeholder="Street, City, Postal Code"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground font-semibold">Phone number</Label>
          <Input id="phone" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} className="h-11" maxLength={30} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-semibold">
            Email <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Input id="email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} className="h-11" maxLength={255} />
        </div>
      </div>

      <Button
        type="submit"
        disabled={submitting}
        size="lg"
        className="w-full h-14 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary-deep"
        style={{ boxShadow: "var(--shadow-elegant)" }}
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" /> Submit Quote Request
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        We'll contact you within 24 hours. Your information is kept private.
      </p>
    </form>
  );
}
