import { FolderOpen, Save, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  adsOrderOptions,
  paymentStatusOptions,
  projectStatusOptions,
  subscriptionTierOptions,
} from "@/data/mockData";

export default function ProjectSetup() {
  return (
    <>
      <PageHeader
        eyebrow="Client Management"
        title="New Client"
        description="Create a client record with the information needed for the main dashboard and the client project dashboard."
        actions={
          <Button>
            <Save className="size-4" />
            Save client
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
        <div className="space-y-6">
          <SectionCard title="Client Details" description="The client list fields shown on the main dashboard.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="client-name">Client name</Label>
                <Input id="client-name" placeholder="Acme Hydration" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-person">Client contact person</Label>
                <Input id="contact-person" placeholder="Maya Flores" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="client-website">Client website</Label>
                <Input id="client-website" placeholder="https://client.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="client-product">Client product</Label>
                <Input id="client-product" placeholder="Product or offer name" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="client-notes">Client notes</Label>
                <Textarea id="client-notes" placeholder="Important context, handoff notes, or internal details." />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Brand Inputs" description="Starter brand fields for the new client's project dashboard.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="brand-name">Brand name</Label>
                <Input id="brand-name" placeholder="Brand name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tagline">Tagline</Label>
                <Input id="tagline" placeholder="Short brand tagline" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="tone">Tone of voice</Label>
                <Input id="tone" placeholder="Confident, premium, witty..." />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="values">Brand values</Label>
                <Textarea id="values" placeholder="Clean ingredients, design-led, sustainable..." />
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Dashboard Status" description="Operational fields used across the client dashboard.">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="subscription-tier">Subscription tier</Label>
                <Select id="subscription-tier" defaultValue="Scale">
                  {subscriptionTierOptions.map((option) => (
                    <option key={option.tier} value={option.tier}>
                      {option.tier} - ${option.price.toLocaleString()} ({option.label})
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="payment-status">Payment status</Label>
                <Select id="payment-status" defaultValue="On-going">
                  {paymentStatusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ads-order">Ads order</Label>
                <Select id="ads-order" defaultValue="Gold">
                  {adsOrderOptions.map((option) => (
                    <option key={option.tier} value={option.tier}>
                      {option.tier} - {option.count} Ads
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="project-status">Project status</Label>
                <Select id="project-status" defaultValue="On-going">
                  {projectStatusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ads-folder">Client ads folder</Label>
                <div className="flex gap-2">
                  <Input id="ads-folder" placeholder="Google Drive handoff URL" />
                  <Button variant="outline" size="icon" aria-label="Attach ads folder">
                    <FolderOpen className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Create Client" description="Save this client, then continue into their project dashboard.">
            <div className="rounded-lg border border-dashed bg-accent/40 p-4 text-sm text-muted-foreground">
              <div className="mb-2 flex items-center gap-2 font-medium text-accent-foreground">
                <UserPlus className="size-4" />
                Ready for dashboard creation
              </div>
              The saved client will appear in the main dashboard and the sidebar client picker.
            </div>
            <Button className="mt-3 w-full">
              <Save className="size-4" />
              Save new client
            </Button>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
