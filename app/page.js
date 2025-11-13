import dynamic from "next/dynamic";
import {
  SafeImage,
  SafeHtml,
  SafeImageUrl,
  SafeImageAlt,
} from "@/utils/helperFunctions";
import JsonLd from "@/components/Seo/jsonLD";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import HomeQuery from "@/queries/home.graphql";
import Button from "@/components/Buttons/MainButton/Button";
const StaffPreview = dynamic(() =>
  import("@/components/StaffPreview/staffPreview")
);
const ServiceCard = dynamic(() =>
  import("@/components/Cards/ServiceCard/ServiceCard")
);

const getData = async () => {
  const { data } = await fetchData(HomeQuery);
  return data?.home?.data?.attributes;
};

export async function generateMetadata() {
  const { meta } = await getData();
  return {
    title: meta?.metaTitle || "Home | Elton Jenkins Law, P.L.L.C.",
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

const Home = async () => {
  const {
    hero,
    modal,
    staffPreviewHeading,
    staffPreview,
    whyUsHeading,
    whyUsCards,
    meta,
  } = await getData();

  return (
    <main className={`min-h-screen ${styles.main}`}>
      <JsonLd jsonLd={meta?.jsonLD} />
      {/* Hero section */}
      <section
        className={`${styles.hero} pt-[var(--size-30)] items-center flex justify-center relative gap-[var(--size-7-5)]`}
      >
        <div
          className={`${styles.textContent} items-center flex flex-col text-center`}
        >
          {SafeHtml(hero.richText)}
          <div
            className={`${styles.button} flex gap-[var(--size-1-5)] mt-[var(--size-1-5)]`}
          >
            {hero?.buttons?.map((button) => (
              <Button key={button.id} href={button.href}>
                {button.label}
              </Button>
            ))}
          </div>
        </div>
        {/* Image */}
        <div className={`${styles.imageWrapper}`}>
          {SafeImage(
            hero.image.data,
            `${styles.image} object-contain`,
            "(min-width: 860px) calc(26.64vw + 135px), 100vw",
            "eager"
          )}
        </div>
      </section>
      {/* Call to Action Section */}
      <section className={`py-[var(--size-15)]`}>
        <article
          className={`${styles.modal} items-center flex flex-col my-0 mx-auto bg-white gap-[var(--size-2)] py-[var(--size-5)] w-[var(--size-100)]`}
        >
          {SafeHtml(modal?.richText)}
          <Button href={modal?.buttons[0]?.href}>
            {modal?.buttons[0]?.label}
          </Button>
        </article>
      </section>
      {/* Our Team Section */}
      <section className={styles.staff}>
        <div className={styles.heading}>{SafeHtml(staffPreviewHeading)}</div>
        {/* Staff Preview */}
        {staffPreview?.map((staff, index) => (
          <StaffPreview
            key={staff.staffOrder}
            socialIcons={staff.socialIcons}
            avatarImage={staff.image.data}
            infoText={staff.richText}
            infoButton={staff.button}
            staffOrder={staff.staffOrder}
            index={index}
            totalItems={staffPreview.length}
          />
        ))}
      </section>
      {/* Why Choose Us Section */}
      <section
        className={`${styles.whyChoose} my-0 mx-auto py-[var(--size-15)]`}
      >
        <div className={styles.services}>
          <div className={styles.heading}>{SafeHtml(whyUsHeading)}</div>
          <ul
            className={`${styles.serviceGrid} flex flex-wrap list-none m-0 p-0 justify-center items-center`}
          >
            {whyUsCards.map((card) => (
              <ServiceCard
                key={card.id}
                icon={card.icon}
                content={card.richText}
                button={card.button}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
