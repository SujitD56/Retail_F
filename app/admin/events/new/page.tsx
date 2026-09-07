"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/shell";
import { FileUploadBox } from "@/components/retailer/file-upload-box";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { api } from "@/lib/api/client";
import { eventCategoryOptions, eventFormDefaults } from "@/lib/data/admin-events";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function AdminCreateEventPage() {
  const router = useRouter();
  const { toast } = useToast();
  const d = eventFormDefaults;

  const [toggles, setToggles] = useState(Object.fromEntries(eventFormDefaults.toggles.map((t) => [t, true])));
  const [name, setName] = useState(d.name);
  const [tagline, setTagline] = useState(d.tagline);
  const [description, setDescription] = useState(d.description);
  const [category, setCategory] = useState(d.category);
  const [registration, setRegistration] = useState(d.registration);
  const [submission, setSubmission] = useState(d.submission);
  const [voting, setVoting] = useState(d.voting);
  const [entryFormat, setEntryFormat] = useState(d.entryFormat);
  const [maxEntries, setMaxEntries] = useState(d.maxEntriesPerRetailer);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const save = async (status: "DRAFT" | "LIVE") => {
    if (!bannerUrl) {
      toast({ title: "Upload a promotional banner first", variant: "error" });
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/events/admin", {
        title: name,
        tagline,
        bannerUrl,
        description,
        category,
        startsAt: registration.start || new Date().toISOString(),
        endsAt: voting.end || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        prizePool: d.prizes.map((p) => `${p.place}: ${p.cash}`).join(", "),
        entryFormat,
        maxEntriesPerRetailer: Number(maxEntries) || undefined,
        config: { toggles, prizes: d.prizes, jury: d.jury, registration, submission, voting },
        status,
      });
      toast({ title: status === "DRAFT" ? "Draft saved" : "Event published", variant: "success" });
      router.push("/admin/events");
    } catch {
      toast({ title: "Couldn't save this event — try again", variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminShell title="Create New Event" subtitle="Configure a new style challenge from basics through jury assignment.">
      <div className="mb-6 flex justify-end gap-3">
        <Button variant="secondary" disabled={submitting} onClick={() => save("DRAFT")}>
          Save as Draft
        </Button>
        <Button disabled={submitting} onClick={() => save("LIVE")}>
          {submitting ? "Publishing…" : "Publish Event"}
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <section className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Basic Info</p>
          <p className="mt-1 text-sm text-ink-500">Set the public profile and theme details for your style challenge.</p>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="eventName">Event Name</Label>
              <Input id="eventName" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="eventTagline">Tagline / Prompt Theme</Label>
              <Input id="eventTagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </div>
          </div>
          <div className="mt-5">
            <Label htmlFor="eventDescription">Description</Label>
            <Textarea id="eventDescription" className="min-h-[100px]" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mt-5">
            <Label>Event Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {eventCategoryOptions.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Phases &amp; Timeline Schedule</p>
          <p className="mt-1 text-sm text-ink-500">Define the sequential timelines for each stage of the event lifecycle.</p>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-ink-900">Registration Period</p>
              <div className="mt-2.5 grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="regStart">Start</Label>
                  <Input id="regStart" value={registration.start} onChange={(e) => setRegistration({ ...registration, start: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="regEnd">End</Label>
                  <Input id="regEnd" value={registration.end} onChange={(e) => setRegistration({ ...registration, end: e.target.value })} />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-ink-900">Submission Period</p>
              <div className="mt-2.5 grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="subStart">Start</Label>
                  <Input id="subStart" value={submission.start} onChange={(e) => setSubmission({ ...submission, start: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="subEnd">End</Label>
                  <Input id="subEnd" value={submission.end} onChange={(e) => setSubmission({ ...submission, end: e.target.value })} />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-ink-900">Public Voting Period</p>
              <div className="mt-2.5 grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="voteStart">Start</Label>
                  <Input id="voteStart" value={voting.start} onChange={(e) => setVoting({ ...voting, start: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="voteEnd">End</Label>
                  <Input id="voteEnd" value={voting.end} onChange={(e) => setVoting({ ...voting, end: e.target.value })} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Contest Rules &amp; Config</p>
          <p className="mt-1 text-sm text-ink-500">Set up format, tagging restrictions, and participant parameters.</p>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="entryFormat">Entry Format</Label>
              <Input id="entryFormat" value={entryFormat} onChange={(e) => setEntryFormat(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="maxEntries">Max Entries Per Retailer</Label>
              <Input id="maxEntries" value={maxEntries} onChange={(e) => setMaxEntries(e.target.value)} />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
            {d.toggles.map((t) => (
              <label key={t} className="flex items-center gap-2.5 text-sm text-ink-900">
                <Checkbox checked={toggles[t]} onCheckedChange={(v) => setToggles((prev) => ({ ...prev, [t]: v === true }))} />
                {t}
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Contest Prizes</p>
          <p className="mt-1 text-sm text-ink-500">Indicate rewards and perks for the top 3 ranking spots.</p>
          <div className="mt-5 flex flex-col divide-y divide-cream-300">
            {d.prizes.map((p) => (
              <div key={p.place} className="grid grid-cols-1 gap-4 py-4 first:pt-0 last:pb-0 sm:grid-cols-[150px_1fr_1fr]">
                <p className="self-center font-display text-lg text-ink-900">{p.place}</p>
                <div>
                  <Label htmlFor={`${p.place}-cash`}>Cash Amount</Label>
                  <Input id={`${p.place}-cash`} defaultValue={p.cash} />
                </div>
                <div>
                  <Label htmlFor={`${p.place}-perks`}>Coupons &amp; Perks</Label>
                  <Input id={`${p.place}-perks`} defaultValue={p.perks} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Grand Jury Slots</p>
          <p className="mt-1 text-sm text-ink-500">Assign historical textile experts and modern fashion designers to judge.</p>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {d.jury.map((j) => (
              <div key={j.name} className="flex flex-col items-center rounded-md border border-cream-300 p-5 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-primary-50 text-lg font-semibold text-primary-600">
                  {initials(j.name)}
                </span>
                <p className="mt-3 font-display text-lg text-ink-900">{j.name}</p>
                <p className="text-sm text-ink-500">{j.role}</p>
                <button type="button" className="mt-4 text-sm font-semibold text-primary-600 hover:underline">
                  Change Judge
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-cream-300 bg-white p-6">
          <p className="font-display text-xl text-ink-900">Promotional Media</p>
          <p className="mt-1 text-sm text-ink-500">Upload the main banners and imagery used on landing and promotional carousels.</p>
          <div className="mt-5">
            <FileUploadBox
              label="Drag & drop event display banner here"
              hint="JPEG, PNG (Recommended 1440x520px)"
              purpose="EVENT_BANNER"
              onUploaded={(files) => setBannerUrl(files[0]?.url ?? null)}
            />
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
