import {
  SafeImageUrl,
  SafeImageAlt,
  SafeHtml,
  IconComponent,
} from "@/utils/helperFunctions";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import ContactPageQuery from "@/queries/contact.graphql";
import Button from "@/components/Buttons/MainButton/Button";
import Map from "@/components/MapPreview/Map";
import CaseEvaluationForm from "@/components/CaseEvaluationForm/CaseEvaluationForm";

const getData = async () => {
  const { data } = await fetchData(ContactPageQuery);
  return data?.contact?.data?.attributes;
};

export async function generateMetadata() {
  const { meta } = await getData();
  return {
    title: meta?.metaTitle || "Contact Us",
    description: meta?.metaDescription || "",
    alternates: {
      canonical: meta?.canonical || "",
    },
    openGraph: {
      title: meta?.ogTitle || "",
      description: meta?.ogDescription || "",
      url: meta?.ogUrl || "",
      type: meta?.ogType || "",
      images: [
        {
          url: SafeImageUrl(meta?.ogImage?.data),
          width: 1200,
          height: 630,
          alt: SafeImageAlt(meta?.ogImage?.data),
        },
      ],
    },
    twitter: {
      card: meta?.twitterCard || "",
    },
  };
}

const ContactPage = async () => {
  const { title, slug, details, cta, socials } = await getData();
  return (
    <main className={styles.contactMain}>
      <section className={styles.mapSection}>
        <Map />
      </section>
      <section className={styles.bookingSection}>
        <div className={`max-w-2xl md:max-w-4xl ${styles.bookingContainer}`}>
          <h1 className={styles.contactInfoTitle}>Contact Us Today!</h1>

          <div className={styles.contactInfoWrapper}>
            <div className={`w-1/4 ${styles.contactInfoContainer}`}>
              {details?.map((detail) => (
                <div className={styles.row} key={detail.id}>
                  <div className={styles.iconWrapper}>
                    {IconComponent({
                      icon: detail.icon,
                      customClassName: styles.icon,
                    })}
                  </div>
                  <div className={styles.textContainer}>
                    {SafeHtml(detail.richText)}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-3/4" id="contact-form">
              <CaseEvaluationForm />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.ctaSection}>
        <div className={styles.textContainer}>
          {SafeHtml(cta?.richText)}
          <Button href={cta?.button?.href}>{cta?.button.label}</Button>
        </div>
        <div className={styles.iconWrapper}>
          {IconComponent({
            icon: cta?.icon,
            customClassName: styles.icon,
          })}
        </div>
      </section>
      <section className={styles.socialSection}>
        <div className={styles.iconWrapper}>
          {socials.icon.map((item) =>
            IconComponent({
              icon: item.icon,
              customClassName: styles.icon,
              href: item.href,
              key: item.id,
            })
          )}
        </div>
        <div className={styles.textContainer}>
          {SafeHtml(socials?.richText)}
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
