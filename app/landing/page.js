import {
	Phone,
	Scale,
	Users,
	Heart,
	Gavel,
	Handshake,
	Shield,
	MapPin,
	Quote,
	Mail,
	Baby,
	Coins,
	FileCheck,
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
import LandingPageForm from "@/components/LandingPage/ContactForm/ContactForm";

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen font-body">
			<section className="relative bg-gray-900 text-white animate-fadeIn">
				<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
				<div className="relative mx-auto max-w-screen-xl px-4 pb-16 pt-48 sm:px-6 md:flex md:items-center md:px-8">
					<div className="md:flex md:items-center md:justify-evenly w-full">
						<div className="max-w-xl mx-auto md:mx-0">
							<h1 className="font-fancy text-3xl font-extrabold sm:text-5xl md:text-6xl animate-slideRight">
								Compassionate Legal Support
								<strong className="block font-extrabold text-[#edbb5f] mt-2">
									in Norman, OK
								</strong>
							</h1>
							<p className="mt-4 max-w-lg text-xl sm:text-2xl animate-slideRight">
								Guiding You Through Life's Legal Challenges with 60+ Years of
								Combined Experience
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
									className={`w-full sm:w-auto flex items-center justify-center gap-2 font-special text-lg`}
									size="lg"
									href="tel:+14052173623"
								>
									{IconComponent({
										icon: "HiOutlineCalendar",
										customClassName: "h-5 w-5",
									})}
									<span>Request Consultation</span>
								</Button>
							</div>
						</div>

						<div
							className="mt-8 mx-auto md:mx-0 w-3/4 md:mt-0 md:w-1/2 md:max-w-md animate-scaleIn"
							id="contact-form"
						>
							<LandingPageForm />
						</div>
					</div>
				</div>
			</section>

			<section
				id="services"
				className="bg-white py-16 px-4 sm:px-6 lg:px-8 animate-slideUp"
			>
				<div className="max-w-6xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
						Our Legal Services
					</h2>
					<Tabs defaultValue="divorce" className="w-full">
						<TabsList className="grid h-auto w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
							<TabsTrigger value="divorce" className="w-full font-special">
								Divorce
							</TabsTrigger>
							<TabsTrigger value="custody" className="w-full font-special">
								Custody
							</TabsTrigger>
							<TabsTrigger
								value="child-support"
								className="w-full font-special"
							>
								Child Support
							</TabsTrigger>
							<TabsTrigger value="mediation" className="w-full font-special">
								Mediation
							</TabsTrigger>
							<TabsTrigger value="paternity" className="w-full font-special">
								Paternity
							</TabsTrigger>
							<TabsTrigger value="guardianship" className="w-full font-special">
								Guardianship
							</TabsTrigger>
						</TabsList>
						{[
							{
								value: "divorce",
								icon: Gavel,
								title: "Divorce",
								description:
									"Expert guidance through contested and uncontested divorces.",
							},
							{
								value: "custody",
								icon: Baby,
								title: "Custody",
								description:
									"Protecting your children's best interests in custody disputes.",
							},
							{
								value: "child-support",
								icon: Coins,
								title: "Child Support",
								description:
									"Ensuring fair child support arrangements for your family.",
							},
							{
								value: "mediation",
								icon: Handshake,
								title: "Mediation",
								description:
									"Facilitating peaceful resolutions to family disputes.",
							},
							{
								value: "paternity",
								icon: FileCheck,
								title: "Paternity",
								description:
									"Establishing or contesting paternity for legal rights.",
							},
							{
								value: "guardianship",
								icon: Shield,
								title: "Guardianship",
								description:
									"Assisting in the legal protection of minors and incapacitated adults.",
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
											Our experienced attorneys provide comprehensive{" "}
											{service.title.toLowerCase()} services, including:
										</p>
										<ul className="list-disc pl-5 space-y-2">
											<li>Initial consultation and case evaluation</li>
											<li>Negotiation and settlement discussions</li>
											<li>Court representation and litigation support</li>
											<li>Document preparation and filing</li>
											<li>Post-judgment modifications and enforcement</li>
										</ul>
										<Button className="mt-6">
											Learn More About {service.title}
										</Button>
									</CardContent>
								</Card>
							</TabsContent>
						))}
					</Tabs>
				</div>
			</section>

			<section
				id="about"
				className="bg-gradient-to-b from-gray-100 to-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-slideUp"
			>
				<div className="max-w-6xl mx-auto relative z-10">
					<h2 className="font-fancy text-4xl font-bold text-center text-gray-900 mb-12">
						Our Story of Justice
					</h2>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<p className="text-lg text-gray-700 leading-relaxed">
								At Elton Jenkins Law, we're more than just attorneys – we're
								your steadfast allies in the pursuit of justice. Our journey
								began with a simple yet powerful idea: to provide compassionate,
								personalized legal support that truly makes a difference in
								people's lives.
							</p>
							<p className="text-lg text-gray-700 leading-relaxed">
								With over 60 years of combined experience, our team has
								weathered countless legal storms, emerging stronger and wiser
								with each case. We've turned this wisdom into a beacon of hope
								for families navigating the complexities of the legal system.
							</p>
							<div className="flex items-center justify-center md:justify-start space-x-4 pt-4">
								<Button variant="outline" className="rounded-full">
									Meet Our Team
								</Button>
								<Button variant="ghost" className="text-primary">
									Our Philosophy
								</Button>
							</div>
						</div>

						<div className="relative">
							<div className="absolute inset-0 bg-primary opacity-10 rounded-full transform -rotate-45"></div>
							<Card className="bg-white shadow-xl relative z-10">
								<CardHeader>
									<CardTitle className="text-2xl font-bold text-center">
										Our Impact
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									{[
										{
											icon: Users,
											title: "1000+ Families Served",
											description: "Guiding families through legal challenges",
										},
										{
											icon: Gavel,
											title: "98% Success Rate",
											description:
												"Achieving favorable outcomes for our clients",
										},
										{
											icon: Heart,
											title: "24/7 Support",
											description: "Always here when you need us most",
										},
										{
											icon: MapPin,
											title: "Local Expertise",
											description: "Deep understanding of Norman, OK laws",
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
							What Sets Us Apart
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{[
								{
									icon: Scale,
									title: "Balanced Approach",
									description: "We blend empathy with strategic legal acumen",
								},
								{
									icon: Handshake,
									title: "Client-Centric Focus",
									description: "Your goals and well-being are our top priority",
								},
								{
									icon: Shield,
									title: "Unwavering Advocacy",
									description: "We stand firm in protecting your rights",
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

				<div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent"></div>
			</section>

			<section className="bg-white py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
				<div className="max-w-6xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
						Meet Our Experienced Attorneys
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								name: "Elton Jenkins",
								role: "Founder",
								bio: "With over 30 years of experience, Elton leads our team with expertise in complex divorce cases.",
							},
							{
								name: "Eric Kroier",
								role: "Family Law Specialist",
								bio: "Eric's dedication to family law has helped numerous clients navigate custody battles successfully.",
							},
							{
								name: "Letitia Ness Brady",
								role: "Divorce Mediation Expert",
								bio: "Letitia's skills in mediation have led to amicable resolutions in high-conflict divorces.",
							},
							{
								name: "Aaron Kroier",
								role: "Contested Divorce Attorney",
								bio: "Aaron's strategic approach has secured favorable outcomes in challenging divorce proceedings.",
							},
						].map((attorney, index) => (
							<div
								key={index}
								className="bg-gray-100 rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 animate-scaleIn"
							>
								<div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
								<h3 className="font-fancy text-xl font-semibold text-gray-900 mb-2">
									{attorney.name}
								</h3>
								<p className="text-primary font-semibold mb-2">
									{attorney.role}
								</p>
								<p className="text-gray-600 text-sm">{attorney.bio}</p>
								<Button variant="outline" className="mt-4">
									View Profile
								</Button>
							</div>
						))}
					</div>
				</div>
			</section>

			<section
				id="testimonials"
				className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 animate-slideUp"
			>
				<div className="max-w-4xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
						What Our Clients Say
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{[
							{
								name: "Sarah M.",
								quote:
									"Elton Jenkins Law provided exceptional support during my divorce. Their expertise and compassion made a difficult time much easier to navigate.",
							},
							{
								name: "John D.",
								quote:
									"The team's dedication to my custody case was outstanding. They fought for my rights and ensured the best outcome for my children.",
							},
						].map((testimonial, index) => (
							<div
								key={index}
								className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl animate-scaleIn"
							>
								<Quote className="h-8 w-8 text-primary mb-4" />
								<p className="text-gray-700 mb-4 italic">
									"{testimonial.quote}"
								</p>
								<p className="text-right font-semibold text-gray-900">
									- {testimonial.name}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section
				id="contact"
				className="bg-white pt-16 pb-24 px-4 sm:px-6 lg:px-8"
			>
				<div className="max-w-4xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-8">
						Contact Us
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
							<LandingPageForm />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
