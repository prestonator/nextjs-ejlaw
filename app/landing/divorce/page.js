import Image from "next/image";
import {
	Phone,
	Calendar,
	Scale,
	Users,
	Heart,
	Gavel,
	Handshake,
	DollarSign,
	Clock,
	Shield,
	FileText,
	Star,
	MapPin,
	Quote,
	Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LandingPageForm from "@/components/LandingPage/ContactForm/ContactForm";

export default function DivorceLandingPage() {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
	const mapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=124+E+Main+St,Norman,OK&zoom=15&size=600x300&key=${apiKey}`;

	// Moved static data outside the component to prevent re-creation on each render
	const features = [
		{
			icon: Scale,
			title: "Expert Legal Support",
			description: "Protecting your rights and interests",
		},
		{
			icon: Users,
			title: "Personalized Approach",
			description: "Tailored solutions for your unique situation",
		},
		{
			icon: Heart,
			title: "Compassionate Care",
			description: "Supporting you through challenging times",
		},
	];

	const services = [
		{
			icon: Gavel,
			title: "Contested Divorce",
			description:
				"When disputes arise, you need a skilled attorney to advocate for you. Our team excels in handling contested divorces, ensuring your voice is heard on critical matters such as asset division, child custody, and spousal support.",
			features: [
				{ icon: Shield, text: "Strategic Representation" },
				{ icon: Scale, text: "Protecting Your Rights" },
				{ icon: FileText, text: "Experience in Complex Cases" },
			],
		},
		{
			icon: Handshake,
			title: "Uncontested Divorce",
			description:
				"Simplify the divorce process with our guidance on uncontested divorces. We'll help you and your spouse reach amicable agreements efficiently, minimizing stress and legal expenses.",
			features: [
				{ icon: Clock, text: "Efficient Process" },
				{ icon: Users, text: "Amicable Resolutions" },
				{ icon: DollarSign, text: "Cost-Effective Solutions" },
			],
		},
	];

	const reasons = [
		{
			icon: Scale,
			title: "60+ Years of Combined Experience",
			description: "Our attorneys bring decades of experience to your case.",
		},
		{
			icon: Star,
			title: "Over 100 Five-Star Reviews",
			description:
				"Join countless satisfied clients who've rated us 4.7 stars on Google.",
		},
		{
			icon: Users,
			title: "Personalized Legal Support",
			description: "We tailor our approach to fit your unique situation.",
		},
		{
			icon: MapPin,
			title: "Serving Norman & Surrounding Counties",
			description:
				"Proudly assisting clients in Norman and nearby communities.",
		},
	];

	const attorneys = [
		{ name: "Elton Jenkins", role: "Founder" },
		{ name: "Eric Kroier", role: "Divorce & Family Law Attorney" },
		{ name: "Letitia Ness Brady", role: "Divorce & Family Law Attorney" },
		{ name: "Aaron Kroier", role: "Civil Attorney" },
	];

	return (
		<div className="flex flex-col min-h-screen font-body">
			<section className="relative bg-gray-900 text-white animate-fadeIn">
				<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
				<div className="relative mx-auto max-w-screen-xl px-4 pb-16 pt-48 sm:px-6 md:flex md:items-center md:px-8">
					<div className="md:flex md:items-center md:justify-evenly w-full">
						<div className="max-w-xl mx-auto md:mx-0">
							<h1 className="font-fancy text-3xl font-extrabold sm:text-5xl md:text-6xl animate-slideRight">
								Compassionate Divorce Attorneys
								<strong className="block font-extrabold text-[#edbb5f] mt-2">
									in Norman, OK
								</strong>
							</h1>

							<p className="mt-4 max-w-lg text-xl sm:text-2xl animate-slideRight">
								Guiding You Through Contested & Uncontested Divorces with 60+
								Years of Combined Experience
							</p>

							<div className="mt-8 flex flex-wrap gap-4 animate-slideRight">
								<Button
									className="w-full sm:w-auto flex items-center justify-center gap-2 font-special text-lg"
									size="lg"
								>
									<Phone className="h-5 w-5" />
									<a href="tel:+14052173623">Call (405) 217-3623</a>
								</Button>

								<Button
									variant="outline"
									className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-900 font-special text-lg"
									size="lg"
									href="#contact-form"
								>
									<Calendar className="h-5 w-5" />
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

			<section className="bg-white py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
				<div className="max-w-4xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-gray-900 mb-8 text-center">
						Your Trusted Partners in Divorce Proceedings
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						{features.map((item, index) => (
							<div
								key={index}
								className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-md animate-scaleIn"
							>
								<item.icon className="h-12 w-12 text-primary mb-4" />
								<h3 className="font-fancy text-xl font-semibold mb-2">
									{item.title}
								</h3>
								<p className="text-gray-600">{item.description}</p>
							</div>
						))}
					</div>
					<div className="text-center space-y-6">
						<p className="text-lg text-gray-700">
							Divorce is a challenging journey, but you don't have to navigate
							it alone. At Elton Jenkins Law, P.L.L.C., our dedicated team of
							divorce attorneys is here to provide compassionate and
							personalized legal support.
						</p>
						<p className="text-lg text-gray-700">
							Whether you're facing a contested divorce or an uncontested
							divorce, we have the expertise to protect your rights and
							interests every step of the way.
						</p>
						<Button
							className="font-special text-lg"
							size="lg"
							href="#contact-form"
						>
							Schedule Your Case Evaluation Today
						</Button>
					</div>
				</div>
			</section>

			<section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
				<div className="max-w-6xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
						Our Divorce Services
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{services.map((service, index) => (
							<div
								key={index}
								className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl animate-scaleIn"
							>
								<div className="flex items-center mb-6">
									<service.icon className="h-10 w-10 text-primary mr-4" />
									<h3 className="font-fancy text-2xl font-semibold text-gray-900">
										{service.title}
									</h3>
								</div>
								<p className="text-gray-700 mb-6">{service.description}</p>
								<ul className="space-y-4">
									{service.features.map((feature, featureIndex) => (
										<li key={featureIndex} className="flex items-center">
											<feature.icon className="h-6 w-6 text-primary mr-2" />
											<span className="text-gray-700">{feature.text}</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<div className="text-center mt-12">
						<Button className="font-special text-lg" size="lg">
							Discuss Your Case With Us
						</Button>
					</div>
				</div>
			</section>

			<section className="bg-white py-16 lg:px-8 animate-slideUp">
				<div className="max-w-6xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
						Why Choose Elton Jenkins Law
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{reasons.map((item, index) => (
							<div
								key={index}
								className="bg-gray-100 rounded-lg p-6 text-center transition-all duration-300 hover:bg-white hover:shadow-lg animate-scaleIn"
							>
								<div className="flex justify-center mb-4">
									<item.icon className="h-12 w-12 text-primary" />
								</div>
								<h3 className="font-fancy text-xl font-semibold text-gray-900 mb-2">
									{item.title}
								</h3>
								<p className="text-gray-700">{item.description}</p>
							</div>
						))}
					</div>
					<div className="text-center mt-12">
						<Button className="font-special text-lg" size="lg">
							Experience the Elton Jenkins Law Difference
						</Button>
					</div>
				</div>
			</section>

			<section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
				<div className="max-w-6xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
						What Our Clients Say
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3].map((index) => (
							<div
								key={index}
								className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl animate-scaleIn"
							>
								<Quote className="h-8 w-8 text-primary mb-4" />
								<p className="text-gray-700 mb-4">
									"Elton Jenkins Law provided exceptional support during my
									divorce. Their expertise and compassion made a difficult time
									much easier to navigate."
								</p>
								<div className="flex items-center">
									<div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
									<div>
										<h4 className="font-fancy font-semibold text-gray-900">
											Client Name
										</h4>
										<p className="text-gray-600">Norman, OK</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-white py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
				<div className="max-w-6xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
						Meet Our Experienced Attorneys
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{attorneys.map((attorney, index) => (
							<div
								key={index}
								className="bg-gray-100 rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:bg-white hover:shadow-xl animate-scaleIn"
							>
								<div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
								<h3 className="font-fancy text-xl font-semibold text-gray-900 mb-2">
									{attorney.name}
								</h3>
								<p className="text-gray-600">{attorney.role}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-gray-100 pt-16 pb-36 px-4 sm:px-6 lg:px-8 animate-slideUp">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="font-fancy text-3xl font-bold text-gray-900 mb-8">
						Contact Us
					</h2>
					<div className="bg-white rounded-lg p-8 mb-8 transition-all duration-300 hover:shadow-lg animate-scaleIn">
						<h3 className="font-fancy text-xl font-semibold text-gray-900 mb-4">
							Elton Jenkins Law, P.L.L.C.
						</h3>
						<p className="text-gray-700 mb-2">
							124 E Main Street, Norman, OK 73069
						</p>
						<div className="flex justify-center space-x-4 mb-4">
							<Button variant="link" className="text-primary font-special">
								<Phone className="mr-2 h-5 w-5" />
								(405) 217-3623
							</Button>
							<Button variant="link" className="text-primary font-special">
								<Mail className="mr-2 h-5 w-5" />
								susan@eltonjenkinslaw.com
							</Button>
						</div>
					</div>
					<div className="aspect-w-16 aspect-h-9">
						<Image
							src={mapsUrl}
							alt="Map showing the location of Elton Jenkins Law"
							width={600}
							height={300}
							className="w-full rounded-lg shadow-lg"
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
