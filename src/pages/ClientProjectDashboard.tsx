import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Bot,
  ArrowRight,
  ExternalLink,
  FolderOpen,
  ImagePlus,
  Minus,
  Plus,
  Save,
  Upload,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  adsOrderOptions,
  audienceInsights,
  brandInputs,
  clientAccounts,
  competitorInsights,
  generatedMessagingPillars,
  paymentStatusOptions,
  productCategoryOptions,
  projectStatusOptions,
  productReferenceImages,
  subscriptionTierOptions,
  type ClientAccount,
} from "@/data/mockData";

const fallbackClient = clientAccounts[0];

function getClient(clientId?: string): ClientAccount {
  return clientAccounts.find((client) => client.id === clientId) ?? fallbackClient;
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Badge key={item} variant="secondary">
          {item}
        </Badge>
      ))}
    </div>
  );
}

function buildMessagingPrompt(brandName: string, brandWebsite: string) {
  return `Brand Name: ${brandName}\nBrand Website: ${brandWebsite}\nUse public brand facts, audience voice, and competitive intelligence to produce a Brand Context Document and 8 creative pillars. Headlines: 25-40 characters. Tone: credible, performance-led, not corny.`;
}

export default function ClientProjectDashboard() {
  const { clientId } = useParams();
  const { hash } = useLocation();
  const client = getClient(clientId);
  const productImages = productReferenceImages.filter((image) => image.clientId === client.id);
  const generatedPrompt = buildMessagingPrompt(brandInputs.brandName, client.website);

  useEffect(() => {
    if (!hash) return;
    const target = document.querySelector(hash);
    const scrollPanel = target?.closest("main");
    if (!target || !(scrollPanel instanceof HTMLElement)) return;

    const panelTop = scrollPanel.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    scrollPanel.scrollTo({
      top: scrollPanel.scrollTop + targetTop - panelTop - 24,
      behavior: "smooth",
    });
  }, [hash]);

  return (
    <>
      <PageHeader
        eyebrow="Client Project Dashboard"
        title={client.clientName}
        description="The connected project workspace for client details, brand inputs, products, audience, guardrails, messaging, and ad concept generation."
        actions={
          <>
            <Button variant="outline" asChild>
              <a href={client.adsFolderUrl} target="_blank" rel="noreferrer">
                <FolderOpen className="size-4" />
                Ads folder
              </a>
            </Button>
            <Button>
              <Save className="size-4" />
              Save
            </Button>
          </>
        }
      />

      <div key={client.id} className="space-y-6">
        <section id="overview" className="scroll-mt-24">
          <SectionCard title="Client Overview" description="Client list details and operational status for this project.">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Client name</Label>
                <Input defaultValue={client.clientName} />
              </div>
              <div className="space-y-1.5">
                <Label>Client contact person</Label>
                <Input defaultValue={client.contactPerson} />
              </div>
              <div className="space-y-1.5">
                <Label>Client website</Label>
                <div className="flex gap-2">
                  <Input defaultValue={client.website} />
                  <Button variant="outline" size="icon" asChild aria-label="Open client website">
                    <a href={client.website} target="_blank" rel="noreferrer">
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Client product</Label>
                <Input defaultValue={client.product} />
              </div>
              <div className="space-y-1.5">
                <Label>Subscription tier</Label>
                <Select defaultValue={client.subscriptionTier}>
                  {subscriptionTierOptions.map((option) => (
                    <option key={option.tier} value={option.tier}>
                      {option.tier} - ${option.price.toLocaleString()} ({option.label})
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Payment status</Label>
                <Select defaultValue={client.paymentStatus}>
                  {paymentStatusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Ads order</Label>
                <Select defaultValue={client.adsOrder}>
                  {adsOrderOptions.map((option) => (
                    <option key={option.tier} value={option.tier}>
                      {option.tier} - {option.count} Ads
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Project status</Label>
                <Select defaultValue={client.projectStatus}>
                  {projectStatusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </Select>
              </div>
            </div>
          </SectionCard>
        </section>

        <section id="brand-inputs" className="scroll-mt-24">
          <SectionCard title="Brand Inputs" description="Brand name, tagline, voice, and values.">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Brand name</Label>
                <Input defaultValue={brandInputs.brandName} />
              </div>
              <div className="space-y-1.5">
                <Label>Tagline</Label>
                <Input defaultValue={brandInputs.tagline} />
              </div>
              <div className="space-y-1.5 lg:col-span-2">
                <Label>Tone of voice</Label>
                <Input defaultValue={brandInputs.toneOfVoice} />
              </div>
              <div className="space-y-1.5 lg:col-span-2">
                <Label>Brand values</Label>
                <TagList items={brandInputs.brandValues} />
              </div>
            </div>
          </SectionCard>
        </section>

        <section id="products" className="scroll-mt-24">
          <SectionCard title="Products" description="Add products and product image references for image generation.">
            <div className="space-y-4">
              <div className="grid gap-4 rounded-lg border p-4 lg:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Product name</Label>
                  <Input defaultValue={brandInputs.productName} />
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select defaultValue={brandInputs.category}>
                    {productCategoryOptions.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-1.5 lg:col-span-2">
                  <Label>Description</Label>
                  <Textarea defaultValue={brandInputs.productDescription} />
                </div>
                <div className="space-y-1.5">
                  <Label>Price point</Label>
                  <Input defaultValue={brandInputs.pricePoint} />
                </div>
                <div className="space-y-1.5">
                  <Label>Product reference images</Label>
                  <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 px-4 py-5 text-center transition-colors hover:border-primary/50 hover:bg-accent/40">
                    <Upload className="size-5 text-muted-foreground" />
                    <span className="mt-2 text-sm font-medium">Upload product images</span>
                    <span className="mt-1 text-xs text-muted-foreground">Packshots, angles, packaging, or in-use photos.</span>
                    <input className="sr-only" type="file" accept="image/*" multiple />
                  </label>
                </div>
                <div className="flex items-end justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Minus className="size-4" />
                    Remove
                  </Button>
                  <Button size="sm">
                    <Plus className="size-4" />
                    Add product
                  </Button>
                </div>
                <div className="lg:col-span-2">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <ImagePlus className="size-4 text-muted-foreground" />
                    Product image references used by the Ad Concept Generator
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {productImages.map((image) => (
                      <div key={image.id} className="overflow-hidden rounded-lg border bg-card">
                        <div className={`h-24 bg-gradient-to-br ${image.imageColor}`} />
                        <div className="space-y-1 p-3">
                          <p className="text-sm font-semibold">{image.label}</p>
                          <Badge variant="outline">{image.type}</Badge>
                          <p className="truncate text-xs text-muted-foreground">{image.fileName}</p>
                        </div>
                      </div>
                    ))}
                    <button className="flex min-h-[156px] flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 p-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
                      <Plus className="size-5" />
                      Add another reference
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </section>

        <section id="audience-market" className="scroll-mt-24">
          <SectionCard title="Audience & Market" description="Generated from the public-source brand research prompt.">
            <div className="space-y-5">
              <div className="grid gap-3 lg:grid-cols-3">
                {audienceInsights.map((insight) => (
                  <div key={insight.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="font-semibold">{insight.segment}</p>
                      <Badge variant="accent">{insight.trigger}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.desire}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Pain point: {insight.painPoint}
                    </p>
                    <div className="mt-3 rounded-md bg-muted/50 p-2 text-xs italic">
                      "{insight.voiceOfCustomer}"
                    </div>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[840px] text-left text-sm">
                  <thead className="border-b text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="pb-3 pr-4 font-semibold">Competitor</th>
                      <th className="pb-3 pr-4 font-semibold">Positioning</th>
                      <th className="pb-3 pr-4 font-semibold">Emotional hook</th>
                      <th className="pb-3 pr-4 font-semibold">Observed claim</th>
                      <th className="pb-3 font-semibold">Opportunity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {competitorInsights.map((competitor) => (
                      <tr key={competitor.id}>
                        <td className="py-3 pr-4 font-medium">{competitor.competitor}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{competitor.positioning}</td>
                        <td className="py-3 pr-4">{competitor.emotionalHook}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{competitor.observedClaim}</td>
                        <td className="py-3 text-muted-foreground">{competitor.opportunity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </SectionCard>
        </section>

        <section id="benefits-guardrails" className="scroll-mt-24">
          <SectionCard title="Benefits & Guardrails" description="The approved benefits and restrictions for all generated ad work.">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Benefits</Label>
                <TagList items={brandInputs.keyBenefits} />
              </div>
              <div className="space-y-1.5">
                <Label>Guardrails</Label>
                <Textarea defaultValue={brandInputs.doNotUse} />
              </div>
            </div>
          </SectionCard>
        </section>

        <section id="messaging-map" className="scroll-mt-24">
          <SectionCard title="Messaging Map" description="ChatGPT-generated strategic pillars from brand facts, audience voice, and competitor research.">
            <div className="mb-5 grid gap-4 lg:grid-cols-[1fr_auto]">
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Bot className="size-4 text-primary" />
                  Internal prompt variables
                </div>
                <p className="text-sm text-muted-foreground">
                  Brand Name: <span className="font-medium text-foreground">{brandInputs.brandName}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Brand Website: <span className="font-medium text-foreground">{client.website}</span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{generatedPrompt}</p>
              </div>
              <div className="flex items-start">
                <Button>
                  <Bot className="size-4" />
                  Generate messaging map
                </Button>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {generatedMessagingPillars.map((pillar) => (
                <div key={pillar.id} className="rounded-lg border p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold">{pillar.pillar}</p>
                      <p className="text-xs text-muted-foreground">{pillar.sentiment}</p>
                    </div>
                    <Badge variant={pillar.mode === "Stable" ? "success" : "accent"}>{pillar.mode}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{pillar.summary}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Customer phrases</p>
                      <TagList items={pillar.evidencePhrases} />
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Callouts</p>
                      <TagList items={pillar.callouts} />
                    </div>
                  </div>
                  <div className="mt-4 rounded-md bg-accent/40 p-3">
                    <p className="mb-1 text-xs font-semibold uppercase text-accent-foreground">Seed headlines</p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.headlineSeeds.map((headline) => (
                        <Badge key={headline} variant="outline">
                          {headline}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <section id="ad-concept-generator" className="scroll-mt-24 rounded-lg border bg-accent/50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-accent-foreground">Go to Ad Concept Generator</p>
              <p className="text-sm text-muted-foreground">Use this client project context to generate campaign concepts and headlines.</p>
            </div>
            <Button asChild>
              <Link to={`/concepts?client=${client.id}`}>
                Open generator <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
