import {
	Phone,
	Scale,
	Users,
	Gavel,
	Shield,
	MapPin,
	Quote,
	Mail,
	AlertTriangle,
	Car,
	FileWarning,
	BadgeAlert,
	Swords
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	IconComponent,
} from "@/utils/helperFunctions";
import CaseEvaluationForm from "@/components/CaseEvaluationForm/CaseEvaluationForm";

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen font-body">
			{/* HERO SECTION */}
			<section className="relative bg-gray-900 text-white animate-fadeIn">
				{/* Courtroom / serious trial background image */}
				<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30"></div>
				<div className="relative mx-auto max-w-[theme(screens.xl)] px-4 pb-16 pt-36 md:pt-48 sm:px-6">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-8 md:gap-12">
						<div className="max-w-xl mx-auto md:mx-0 text-center md:text-left flex-1">
							<h1 className="font-fancy text-4xl sm:text-5xl md:text-6xl font-extrabold animate-slideRight leading-tight">
								Oklahoma&apos;s Toughest Defense for Serious Crimes
							</h1>
							<p className="mt-4 max-w-lg mx-auto md:mx-0 text-lg sm:text-xl md:text-2xl animate-slideRight text-gray-200">
								Murder, Manslaughter, & High-Stakes Felonies. 25+ Years of Experience & Former OIDS Public Defender.
							</p>

							<div className="mt-8 flex flex-wrap gap-4 animate-slideRight">
								<Button
									className={`w-full sm:w-auto flex items-center justify-center gap-2 font-special text-lg`}
									size="lg"
									href="tel:+14052173623"
								>
									{IconComponent({
										icon: "HiOutlinePhone",
										customClassName: "h-5 w-5",
									})}
									<span>Call (405) 217-3623</span>
								</Button>
								<Button
									className={`w-full sm:w-auto flex items-center justify-center gap-2 text-black font-special text-lg`}
									size="lg"
									href="#contact-form"
									variant="outline"
								>
									{IconComponent({
										icon: "HiOutlineCalendar",
										customClassName: "h-5 w-5",
									})}
									<span>Free Case Evaluation</span>
								</Button>
							</div>
						</div>

						{/* FORM ABOVE THE FOLD - CRITICAL FOR ADS */}
						<div
							className="mt-10 mx-auto md:mx-0 w-full sm:w-3/4 md:w-1/2 md:max-w-md animate-scaleIn flex-shrink-0"
							id="contact-form"
						>
							<CaseEvaluationForm />
						</div>
					</div>
				</div>
			</section>

			{/* SERVICES SECTION */}
			<section
				id="services"
				className="bg-white py-16 px-4 sm:px-6 lg:px-8 animate-slideUp"
			>
				<div className="max-w-6xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
						High-Stakes Criminal Defense Services
					</h2>
					<Tabs defaultValue="murder-manslaughter" className="w-full">
						<TabsList className="grid h-auto w-full grid-cols-2 lg:grid-cols-5 gap-2">
							<TabsTrigger value="murder-manslaughter" className="w-full font-special whitespace-normal h-auto py-2 text-xs sm:text-sm">
								Murder & Manslaughter
							</TabsTrigger>
							<TabsTrigger value="violent-crimes" className="w-full font-special whitespace-normal h-auto py-2 text-xs sm:text-sm">
								Violent Crimes
							</TabsTrigger>
							<TabsTrigger value="drug-trafficking" className="w-full font-special whitespace-normal h-auto py-2 text-xs sm:text-sm">
								Drug Trafficking
							</TabsTrigger>
							<TabsTrigger value="felony-dui" className="w-full font-special whitespace-normal h-auto py-2 text-xs sm:text-sm">
								Felony DUI
							</TabsTrigger>
							<TabsTrigger value="weapons-charges" className="w-full font-special whitespace-normal h-auto py-2 text-xs sm:text-sm">
								Weapons Charges
							</TabsTrigger>
						</TabsList>
						{[
							{
								value: "murder-manslaughter",
								icon: Swords,
								title: "Murder & Manslaughter",
								description:
									"When your life is on the line, you need a defense that will scrutinize every piece of forensic and witness evidence.",
							},
							{
								value: "violent-crimes",
								icon: AlertTriangle,
								title: "Assault & Violent Crimes",
								description:
									"Assault, battery, and other high-stakes violent crime charges handled with uncompromising courtroom advocacy.",
							},
							{
								value: "drug-trafficking",
								icon: FileWarning,
								title: "Drug Trafficking & Distribution",
								description:
									"Defending against serious state-level drug charges. We expose illegal searches and constitutional rights violations.",
							},
							{
								value: "felony-dui",
								icon: Car,
								title: "Felony & Aggravated DUI",
								description:
									"Severe charges require severe defense. We protect clients facing prison time and enhanced penalties for high BAC or repeat offenses.",
							},
							{
								value: "weapons-charges",
								icon: Shield,
								title: "Weapons Charges",
								description:
									"Possession of a firearm by a felon or using a weapon in the commission of a crime dramatically increases the stakes.",
							},
						].map((service) => (
							<TabsContent key={service.value} value={service.value}>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<service.icon className="h-6 w-6 text-primary" />
											{service.title}
										</CardTitle>
										<CardDescription>{service.description}</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="mb-4">
											Our experienced defense team provides comprehensive strategies for
											{service.title.toLowerCase()} cases, including:
										</p>
										<ul className="list-disc pl-5 space-y-2">
											<li>Immediate case evaluation and evidence preservation</li>
											<li>Challenging probable cause and illegal traffic stops</li>
											<li>Cross-examining arresting officers and testing methods</li>
											<li>Aggressive negotiation with prosecutors</li>
											<li>Relentless courtroom representation at trial</li>
										</ul>
										<Button className="mt-6">
											Get Help With {service.title}
										</Button>
									</CardContent>
								</Card>
							</TabsContent>
						))}
					</Tabs>
				</div>
			</section>

			{/* ABOUT SECTION */}
			<section
				id="about"
				className="bg-linear-to-b from-gray-100 to-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-slideUp"
			>
				<div className="max-w-6xl mx-auto relative z-10">
					<h2 className="font-fancy text-4xl font-bold text-center text-gray-900 mb-12">
						Relentless Oklahoma Defense
					</h2>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<p className="text-lg text-gray-700 leading-relaxed">
								At Elton Jenkins Law, PLLC, we handle high-stakes criminal defense. Period. We don&apos;t practice civil law, and we don&apos;t take federal cases. Our singular, uncompromising focus is defending your freedom against the most serious state charges in Oklahoma.
							</p>
							<p className="text-lg text-gray-700 leading-relaxed">
								With over 25 years of courtroom experience, including invaluable time spent as an OIDS Public Defender, Elton Jenkins knows the Oklahoma justice system from the inside out. We take on the toughest cases—Murder, Manslaughter, Drug Trafficking, and Violent Crimes—because we know exactly how to dismantle the prosecution&apos;s arguments.
							</p>
							<div className="flex items-center justify-center md:justify-start space-x-4 pt-4">
								<Button variant="outline" className="rounded-full">
									Meet Elton Jenkins
								</Button>
								<Button variant="ghost" className="text-primary">
									Our Case Results
								</Button>
							</div>
						</div>

						<div className="relative">
							<div className="absolute inset-0 bg-primary opacity-10 rounded-full transform -rotate-45"></div>
							<Card className="bg-white shadow-xl relative z-10">
								<CardHeader>
									<CardTitle className="text-2xl font-bold text-center">
										Why Choose Us?
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									{[
										{
											icon: Scale,
											title: "25+ Years Experience",
											description: "Decades of proven courtroom advocacy.",
										},
										{
											icon: Shield,
											title: "Former OIDS Defender",
											description: "Insider knowledge of Oklahoma prosecution tactics.",
										},
										{
											icon: Gavel,
											title: "Criminal Defense Only",
											description: "100% focused on fighting criminal charges.",
										},
										{
											icon: MapPin,
											title: "Central OK Focus",
											description: "Serving Norman, OKC, Cleveland Co, and beyond.",
										},
									].map((item, index) => (
										<div key={index} className="flex items-center space-x-4">
											<div className="bg-primary-100 p-2 rounded-full">
												<item.icon className="h-6 w-6 text-primary" />
											</div>
											<div>
												<h3 className="font-fancy font-semibold">
													{item.title}
												</h3>
												<p className="text-sm text-gray-600">
													{item.description}
												</p>
											</div>
										</div>
									))}
								</CardContent>
							</Card>
						</div>
					</div>

					<div className="mt-16 text-center">
						<h3 className="font-fancy text-2xl font-bold text-gray-900 mb-6">
							Our Defense Philosophy
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{[
								{
									icon: Shield,
									title: "Aggressive Advocacy",
									description: "We don't back down. We challenge every piece of evidence and every police report.",
								},
								{
									icon: AlertTriangle,
									title: "High-Stakes Focus",
									description: "Built to handle severe felonies, aggravated DUIs, and repeat offenses.",
								},
								{
									icon: Users,
									title: "Direct Attorney Access",
									description: "You work directly with experienced legal counsel, not paralegals.",
								},
							].map((item, index) => (
								<div
									key={index}
									className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg border border-gray-200 animate-scaleIn"
								>
									<div className="flex flex-col items-center text-center">
										<div className="bg-primary-100 p-3 rounded-full mb-4">
											<item.icon className="h-8 w-8 text-primary" />
										</div>
										<h3 className="font-fancy text-xl font-semibold text-gray-900 mb-2">
											{item.title}
										</h3>
										<p className="text-gray-700">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-white to-transparent"></div>
			</section>

			{/* ATTORNEY SECTION */}
			<section className="bg-white py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
				<div className="max-w-4xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
						Meet Your Defense Attorney
					</h2>
					<div className="bg-gray-100 rounded-lg shadow-lg p-8 sm:p-12 transition-all duration-300 hover:shadow-xl animate-scaleIn">
						<div className="flex flex-col md:flex-row items-center gap-8">
							<div className="w-48 h-48 bg-gray-300 rounded-full flex-shrink-0"></div>
							<div className="text-center md:text-left">
								<h3 className="font-fancy text-3xl font-bold text-gray-900 mb-2">
									Elton Jenkins
								</h3>
								<p className="text-primary text-xl font-semibold mb-4">
									Founder & Lead Counsel
								</p>
								<p className="text-gray-700 text-lg leading-relaxed">
									With over 25 years of courtroom experience and a background as an OIDS Public Defender, Elton provides aggressive, uncompromising representation for high-stakes criminal charges in Oklahoma. He personally handles every case, ensuring you receive dedicated, experienced counsel when your freedom is on the line.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* TESTIMONIALS SECTION */}
			<section
				id="testimonials"
				className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 animate-slideUp"
			>
				<div className="max-w-4xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
						Proven Results When It Matters Most
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{[
							{
								name: "Michael T.",
								quote:
									"I was facing a felony DUI that threatened to ruin my career. Elton Jenkins stepped in, fought aggressively, and saved my future. I cannot recommend this firm enough if you are in serious trouble.",
							},
							{
								name: "David R.",
								quote:
									"When I was arrested, I felt completely hopeless. Elton's experience as a former public defender clearly showed in the courtroom. He knows exactly how to dismantle the prosecution's case. He got my charges significantly reduced.",
							},
						].map((testimonial, index) => (
							<div
								key={index}
								className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl animate-scaleIn"
							>
								<Quote className="h-8 w-8 text-primary mb-4" />
								<p className="text-gray-700 mb-4 italic">
									&quot;{testimonial.quote}&quot;
								</p>
								<p className="text-right font-semibold text-gray-900">
									- {testimonial.name}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CONTACT SECTION */}
			<section
				id="contact"
				className="bg-white pt-16 pb-24 px-4 sm:px-6 lg:px-8"
			>
				<div className="max-w-4xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-8">
						Don&apos;t Wait. Secure Your Defense Today.
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-gray-100 rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-xl animate-scaleIn">
							<h3 className="font-fancy text-xl font-semibold text-gray-900 mb-4">
								Our Office
							</h3>
							<p className="text-gray-700 mb-2">
								124 E Main Street, Norman, OK 73069
							</p>
							<div className="flex flex-col space-y-2 mb-4">
								<Button
									variant="link"
									className="text-primary font-special transition-colors duration-300 hover:text-primary-dark justify-start"
								>
									<Phone className="mr-2 h-5 w-5" />
									(405) 217-3623
								</Button>
								<Button
									variant="link"
									className="text-primary font-special transition-colors duration-300 hover:text-primary-dark justify-start"
								>
									<Mail className="mr-2 h-5 w-5" />
									info@eltonjenkinslaw.com
								</Button>
							</div>
							<div className="aspect-w-16 aspect-h-9">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.2926500893147!2d-97.44205338474876!3d35.22231868030421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b269c7c7cb3ecb%3A0x1a3c7270df5a8c72!2s124%20E%20Main%20St%2C%20Norman%2C%20OK%2073069!5e0!3m2!1sen!2sus!4v1623345678901!5m2!1sen!2sus"
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									className="rounded-lg"
								></iframe>
							</div>
						</div>
						<div className="bg-gray-100 rounded-lg p-8 shadow-lg transition-all duration-300 hover:shadow-xl animate-scaleIn">
							<CaseEvaluationForm />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}