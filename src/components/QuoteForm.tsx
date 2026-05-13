import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdoqzby";

const quoteSchema = z.object({
  home_stories: z.enum(["1-story", "2-story", "3-story"]),
  gutter_issues: z.enum(["yes", "no", "not_sure"]),
  service_interest: z.enum(["clean_seal", "gutter_guard", "not_sure"]),
  name: z.string().trim().min(1, "Name is required").max(100),
  city: z.string().trim().min(1, "City is required").max(100),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const initialState: QuoteFormData = {
  home_stories: "1-story",
  gutter_issues: "no",
  service_interest: "clean_seal",
  name: "",
  city: "",
  phone: "",
  email: "",
};

export function QuoteForm() {
  const [data, setData] = useState<QuoteFormData>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
    setData((currentData) => ({ ...currentData, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    const parsed = quoteSchema.safeParse(data);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      toast.error(first?.message ?? "Please complete the form");
      setSubmitting(false);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.set("home_stories", parsed.data.home_stories);
    formData.set("gutter_issues", parsed.data.gutter_issues);
    formData.set("service_interest", parsed.data.service_interest);
    formData.set("name", parsed.data.name);
    formData.set("city", parsed.data.city);
    formData.set("phone", parsed.data.phone);
    formData.set("email", parsed.data.email);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        let message = "We couldn't submit your request. Please try again.";

        try {
          const responseData = await response.json();
          const firstError = responseData?.errors?.[0]?.message;

          if (typeof firstError === "string" && firstError.trim().length > 0) {
            message = firstError;
          }
        } catch {
          // Keep the fallback message when the response is not JSON.
        }

        setSubmitError(message);
        toast.error(message);
        return;
      }

      setData(initialState);
      setSuccess(true);
      toast.success("Quote request sent successfully.");
    } catch {
      const message =
        "We couldn't submit your request. Please check your connection and try again.";

      setSubmitError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        id="quote-form-success"
        className="bg-card rounded-2xl p-8 md:p-12 border border-border text-center"
        style={{ boxShadow: "var(--shadow-card)" }}
        aria-live="polite"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
          Your message has been received
        </h3>
        <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
          Thank you for reaching out to Allawy Solutions. A member of our team will contact you
          within the next <strong className="text-foreground">24 hours</strong> to discuss your
          quote.
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setData(initialState);
            setSubmitError("");
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
      method="POST"
      action={FORMSPREE_ENDPOINT}
      id="quote-request-form"
      className="bg-card rounded-2xl p-6 md:p-10 border border-border space-y-7 text-left"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="space-y-3">
        <Label className="text-foreground font-semibold">
          Is the house 1-story (bungalow), 2-story, or 3-story?
        </Label>
        <RadioGroup
          name="home_stories"
          required
          value={data.home_stories}
          onValueChange={(v) => update("home_stories", v as QuoteFormData["home_stories"])}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2"
        >
          {[
            { value: "1-story", label: "1-story (Bungalow)" },
            { value: "2-story", label: "2-story" },
            { value: "3-story", label: "3-story" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <RadioGroupItem value={option.value} id={`stories-${option.value}`} />
              <span className="text-sm font-medium text-foreground">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-foreground font-semibold">
          Are you experiencing active leaks, overflowing, or sagging gutters?
        </Label>
        <RadioGroup
          name="gutter_issues"
          required
          value={data.gutter_issues}
          onValueChange={(v) => update("gutter_issues", v as QuoteFormData["gutter_issues"])}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2"
        >
          {[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "not_sure", label: "Not sure" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <RadioGroupItem value={option.value} id={`gutter-issues-${option.value}`} />
              <span className="text-sm font-medium text-foreground">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-foreground font-semibold">
          Are you interested in a one-time tune-up or a permanent solution?
        </Label>
        <RadioGroup
          name="service_interest"
          required
          value={data.service_interest}
          onValueChange={(v) => update("service_interest", v as QuoteFormData["service_interest"])}
          className="grid grid-cols-1 gap-2"
        >
          {[
            { value: "clean_seal", label: "One-time tune-up, Clean, Seal & Reinforce (CSR)" },
            {
              value: "gutter_guard",
              label: "Permanent solution (Gutter Guard Installation) - includes free CSR",
            },
            { value: "not_sure", label: "Not sure - need a recommendation" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <RadioGroupItem value={option.value} id={`service-interest-${option.value}`} />
              <span className="text-sm font-medium text-foreground">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-border">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name" className="text-foreground font-semibold">
            Full name
          </Label>
          <Input
            id="name"
            name="name"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            className="h-11"
            maxLength={100}
            required
            autoComplete="name"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="city" className="text-foreground font-semibold">
            City
          </Label>
          <Input
            id="city"
            name="city"
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            className="h-11"
            maxLength={100}
            placeholder="e.g. Toronto"
            required
            autoComplete="address-level2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground font-semibold">
            Phone number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="h-11"
            maxLength={30}
            required
            autoComplete="tel"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-semibold">
            Email <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className="h-11"
            maxLength={255}
            autoComplete="email"
          />
        </div>
      </div>

      {submitError ? (
        <div
          id="quote-form-error"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {submitError}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={submitting}
        size="lg"
        className="w-full h-14 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary-deep"
        style={{ boxShadow: "var(--shadow-elegant)" }}
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Sending...</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Send className="h-5 w-5" />
            <span>Submit Quote Request</span>
          </span>
        )}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        We'll contact you within 24 hours. Your information is kept private.
      </p>
    </form>
  );
}
