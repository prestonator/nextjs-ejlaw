import { Button } from "@/components/ui/button";
import { IconComponent } from "@/utils/helperFunctions";
import LandingPageForm from "@/components/LandingPage/ContactForm/ContactForm";
import CaseEvaluationForm from "@/components/CaseEvaluationForm/CaseEvaluationForm";

const LandingHero = ({ landing_page_hero }) => {
	return (
		<section className="relative bg-gray-900 text-white animate-fadeIn">
			{/* Background Image */}
			<div
				className={`absolute inset-0 bg-[url('https://ej-law-space.sfo3.cdn.digitaloceanspaces.com/uploads/3e513387e27b2c5cac7f3b2e2846027d.webp')] bg-cover bg-top opacity-20`}
			></div>
			{/* Content */}
			<div className="relative mx-auto max-w-screen-xl px-4 pb-16 pt-48 sm:px-6 md:flex md:items-center md:px-8">
				<div className="md:flex md:items-center md:justify-evenly w-full">
					{/* Text Content */}
					<div className="max-w-xl mx-auto md:mx-0">
						<h1 className="font-fancy text-3xl font-extrabold sm:text-5xl md:text-6xl animate-slideRight">
							{landing_page_hero.header}
							<strong className="block font-extrabold text-[#edbb5f] mt-2">
								{landing_page_hero.subheader}
							</strong>
						</h1>
						<p className="mt-4 max-w-lg text-xl sm:text-2xl animate-slideRight">
							{landing_page_hero.description}
						</p>
						<div className="mt-8 flex flex-wrap gap-4 animate-slideRight">
							{landing_page_hero.heroButton.map((button) => (
								<Button
									key={button.id}
									className="w-full sm:w-auto flex items-center justify-center gap-2 font-special text-lg"
									variant={button.id % 2 === 0 ? "outline" : undefined}
									size="lg"
									href={button.href}
								>
									{IconComponent({ icon: button.icon })}
									<span>{button.label}</span>
								</Button>
							))}
						</div>
					</div>
					{/* Contact Form */}
					<div
						className="mt-8 mx-auto md:mx-0 w-3/4 md:mt-0 md:w-1/2 md:max-w-md animate-scaleIn"
						id="contact-form"
					>
						<CaseEvaluationForm />
					</div>
				</div>
			</div>
		</section>
	);
};

export default LandingHero;
