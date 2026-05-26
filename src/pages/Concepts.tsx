import * as React from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Copy,
  ExternalLink,
  ImagePlus,
  LinkIcon,
  MessageSquare,
  RotateCcw,
  Sparkles,
  ThumbsDown,
  Upload,
  Wand2,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  clientAccounts,
  concepts,
  imagePrompts,
  inspiration,
  messagingMap,
  productReferenceImages,
  revisions,
  type Concept,
  type Revision,
} from "@/data/mockData";

const generatedAds = [
  {
    id: "ga-1",
    conceptTitle: "The Glow Check",
    status: "Ready for review",
    imageColor: "from-amber-200 via-rose-200 to-pink-300",
    note: "Product hero with warm beauty lighting and visible condensation.",
  },
  {
    id: "ga-2",
    conceptTitle: "No Crash Club",
    status: "Needs human pass",
    imageColor: "from-lime-200 via-emerald-200 to-cyan-300",
    note: "Lifestyle composition with stronger product placement needed.",
  },
  {
    id: "ga-3",
    conceptTitle: "Inside Glow",
    status: "Rejected memory candidate",
    imageColor: "from-violet-200 via-fuchsia-200 to-orange-200",
    note: "Too abstract unless paired with a direct product or pack shot.",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      <Copy className="size-4" />
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

function ConceptCard({ concept, selected, onPick }: { concept: Concept; selected: boolean; onPick: () => void }) {
  return (
    <Card className={selected ? "border-primary shadow-sm" : ""}>
      <CardHeader className="space-y-0">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <Badge variant="accent">{concept.pillar}</Badge>
          <Badge variant={concept.withProduct ? "outline" : "secondary"}>
            {concept.withProduct ? "Product included" : "No product"}
          </Badge>
        </div>
        <CardTitle className="text-base">{concept.title}</CardTitle>
        <p className="mt-1 text-sm italic text-muted-foreground">{concept.bigIdea}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg border bg-muted/40 p-4">
          <p className="text-lg font-bold leading-tight">{concept.headline}</p>
          <p className="mt-1 text-sm text-muted-foreground">{concept.subhead}</p>
          <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {concept.cta} <ArrowRight className="size-3" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {concept.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
        <Button className="w-full" variant={selected ? "default" : "outline"} onClick={onPick}>
          <ImagePlus className="size-4" />
          {selected ? "Included in generation" : "Pick for image generation"}
        </Button>
      </CardContent>
    </Card>
  );
}

function RevisionCard({ revision }: { revision: Revision }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-semibold">{revision.asset}</p>
            <p className="text-xs text-muted-foreground">
              {revision.conceptTitle} · Round {revision.round}
            </p>
          </div>
          <Badge variant={revision.status === "approved" ? "success" : revision.status === "rejected" ? "destructive" : "warning"}>
            {revision.status}
          </Badge>
        </div>
        <div className="mt-3 rounded-lg bg-muted/50 p-3 text-sm">
          {revision.feedback || "Awaiting human review notes."}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <Button size="sm" variant="outline">
            <CheckCircle2 className="size-4" />
            Approve
          </Button>
          <Button size="sm" variant="outline">
            <RotateCcw className="size-4" />
            Revise
          </Button>
          <Button size="sm" variant="outline">
            <ThumbsDown className="size-4" />
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Concepts() {
  const [searchParams] = useSearchParams();
  const client = clientAccounts.find((item) => item.id === searchParams.get("client")) ?? clientAccounts[0];
  const [selectedConceptId, setSelectedConceptId] = React.useState(concepts[0]?.id ?? "");
  const selectedConcept = concepts.find((concept) => concept.id === selectedConceptId) ?? concepts[0];
  const productImages = React.useMemo(
    () => productReferenceImages.filter((image) => image.clientId === client.id),
    [client.id]
  );
  const [selectedProductImageId, setSelectedProductImageId] = React.useState(productImages[0]?.id ?? "");
  const selectedProductImage =
    productImages.find((image) => image.id === selectedProductImageId) ?? productImages[0];

  React.useEffect(() => {
    setSelectedProductImageId(productImages[0]?.id ?? "");
  }, [client.id, productImages]);

  return (
    <>
      <PageHeader
        eyebrow="Ad Concept Generator"
        title={`${client.clientName} Ad Concept Generator`}
        description="Build ad inspiration, generate concept cards from the messaging map, create image prompts, and run human review before design handoff."
        actions={
          <Button>
            <Sparkles className="size-4" />
            Generate concepts
          </Button>
        }
      />

      <div className="space-y-6">
        <SectionCard title="Ad Inspiration Library" description="Upload references or add links that should influence concept and image direction.">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <div className="rounded-lg border border-dashed bg-muted/30 p-5 text-center">
                <Upload className="mx-auto size-6 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Upload ad reference</p>
                <p className="mt-1 text-xs text-muted-foreground">Images, screenshots, PDFs, or swipe files.</p>
                <Button className="mt-3" variant="outline" size="sm">
                  Choose file
                </Button>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reference-link">Reference link</Label>
                <div className="flex gap-2">
                  <Input id="reference-link" placeholder="https://ad-library-link.com" />
                  <Button variant="outline" size="icon" aria-label="Add reference link">
                    <LinkIcon className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {inspiration.slice(0, 4).map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className={`h-24 bg-gradient-to-br ${item.imageColor}`} />
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold">{item.brand}</p>
                      <Badge variant="outline">{item.format}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{item.title}</p>
                    <Button variant="ghost" size="sm" className="mt-2 h-8 px-0 text-primary">
                      View source <ExternalLink className="size-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Concepts & Headline Generator" description="Generated as card-style concepts from the client's messaging pillars and map.">
          <div className="mb-4 grid gap-3 rounded-lg bg-accent/40 p-4 lg:grid-cols-3">
            {messagingMap.map((pillar) => (
              <div key={pillar.id}>
                <p className="text-sm font-semibold text-accent-foreground">{pillar.pillar}</p>
                <p className="mt-1 text-xs text-muted-foreground">{pillar.promise}</p>
              </div>
            ))}
          </div>
          <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="space-y-1.5">
              <Label htmlFor="generator-model">AI provider</Label>
              <Select id="generator-model">
                <option>ChatGPT API</option>
                <option>Claude API</option>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full sm:w-auto">
                <Bot className="size-4" />
                Generate from messaging map
              </Button>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {concepts.map((concept) => (
              <ConceptCard
                key={concept.id}
                concept={concept}
                selected={selectedConceptId === concept.id}
                onPick={() => setSelectedConceptId(concept.id)}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Image Generation Prompts" description="Create prompt cards for Google Nano Banana or Google Imagen 3 API from the selected concept.">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="image-model">Image model</Label>
                <Select id="image-model">
                  <option>Google Nano Banana</option>
                  <option>Google Imagen 3</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="selected-concept">Selected concept</Label>
                <Select id="selected-concept" value={selectedConceptId} onChange={(event) => setSelectedConceptId(event.target.value)}>
                  {concepts.map((concept) => (
                    <option key={concept.id} value={concept.id}>
                      {concept.title}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="product-reference">Product image reference</Label>
                <Select
                  id="product-reference"
                  value={selectedProductImageId}
                  onChange={(event) => setSelectedProductImageId(event.target.value)}
                  disabled={productImages.length === 0}
                >
                  {productImages.length > 0 ? (
                    productImages.map((image) => (
                      <option key={image.id} value={image.id}>
                        {image.label} - {image.type}
                      </option>
                    ))
                  ) : (
                    <option>No product images uploaded</option>
                  )}
                </Select>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                {selectedProductImage ? (
                  <div className="grid gap-3 sm:grid-cols-[8rem_1fr]">
                    <div className={`h-28 rounded-md bg-gradient-to-br ${selectedProductImage.imageColor}`} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{selectedProductImage.label}</p>
                        <Badge variant="outline">{selectedProductImage.type}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{selectedProductImage.fileName}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{selectedProductImage.note}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Upload product images in the client's Products section before generating product-specific ads.
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="generation-notes">Generation notes</Label>
                <Textarea
                  key={`${selectedConcept?.id}-${selectedProductImage?.id ?? "no-product"}`}
                  id="generation-notes"
                  defaultValue={`Generate a polished ad image for "${selectedConcept?.title}" using the "${selectedConcept?.pillar}" messaging pillar. Use "${selectedProductImage?.label ?? "the uploaded product image"}" as the product reference for shape, packaging, label details, and material accuracy.`}
                />
              </div>
              <Button className="w-full">
                <Wand2 className="size-4" />
                Generate image prompts
              </Button>
            </div>

            <div className="grid gap-4">
              {imagePrompts.map((prompt) => (
                <Card key={prompt.id}>
                  <CardHeader className="gap-3 space-y-0 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-base">{prompt.conceptTitle}</CardTitle>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="accent">{prompt.model}</Badge>
                        <Badge variant="outline">{prompt.aspectRatio}</Badge>
                        <Badge variant={prompt.withProduct ? "outline" : "secondary"}>
                          {prompt.withProduct ? "Product visible" : "No product"}
                        </Badge>
                      </div>
                    </div>
                    <CopyButton text={prompt.prompt} />
                  </CardHeader>
                  <CardContent>
                    <p className="rounded-lg bg-muted/50 p-3 text-sm leading-relaxed">{prompt.prompt}</p>
                    <p className="mt-2 text-xs text-muted-foreground">Negative: {prompt.negativePrompt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Human Verification / Checking" description="Review generated ad concepts, approve design handoff, request revisions, or capture rejection memory per client project.">
          <div className="grid gap-4 lg:grid-cols-3">
            {generatedAds.map((ad) => (
              <Card key={ad.id} className="overflow-hidden">
                <div className={`flex h-40 items-end bg-gradient-to-br ${ad.imageColor} p-3`}>
                  <Badge variant="secondary" className="bg-white/90">
                    {ad.status}
                  </Badge>
                </div>
                <CardContent className="space-y-3 p-4">
                  <p className="font-semibold">{ad.conceptTitle}</p>
                  <p className="text-sm text-muted-foreground">{ad.note}</p>
                  <div className="grid gap-2">
                    <Button size="sm">
                      <CheckCircle2 className="size-4" />
                      Approve and send to Figma
                    </Button>
                    <Button size="sm" variant="outline">
                      <RotateCcw className="size-4" />
                      Request revision
                    </Button>
                    <Button size="sm" variant="outline">
                      <ThumbsDown className="size-4" />
                      Reject and save reason
                    </Button>
                  </div>
                  <Textarea placeholder="Reason for rejection or revision notes saved to this client project..." />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {revisions.slice(0, 2).map((revision) => (
              <RevisionCard key={revision.id} revision={revision} />
            ))}
          </div>

          <div className="mt-5 flex gap-2 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
            <MessageSquare className="mt-0.5 size-4 shrink-0" />
            <p>
              Approval routes the selected concept into Figma design. Revision sends it back through image generation or manual artist work. Rejection captures the reason as separate memory for {client.clientName}.
            </p>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
