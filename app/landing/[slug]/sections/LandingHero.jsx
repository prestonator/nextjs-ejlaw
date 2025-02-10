import { Button } from "@/components/ui/button";
import { IconComponent } from "@/utils/RenderIcon";
import CaseEvaluationForm from "@/components/CaseEvaluationForm/CaseEvaluationForm";
import { SafeImage } from "@/utils/helperFunctions";

const LandingHero = ({ landing_page_hero }) => {
	return (
		<section className="relative bg-gray-900 text-white animate-fadeIn">
			{/* Background Image */}
			<div className="absolute inset-0 bg-cover bg-top z-1 opacity-80 bg-gray-900"></div>
			{SafeImage(
				landing_page_hero?.image?.data,
				"object-cover",
				"100vw",
				"eager"
			)}
			{/* Content */}
			<div className="z-2 relative mx-auto max-w-[theme(screens.xl)] px-4 pb-16 pt-48 sm:px-6 md:flex md:items-center md:px-8">
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
