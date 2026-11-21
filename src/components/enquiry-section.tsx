import { EnquiryForm } from "@/components/enquiry-form";
import { Eyebrow } from "@/components/section-heading";

export function EnquirySection() {
  return (
    <section id="enquire" className="scroll-mt-6 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow>Enquire</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">Send an enquiry.</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">A few quick details and we&rsquo;ll get back to you.</p>
        </div>
        <div className="lg:col-span-8">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
