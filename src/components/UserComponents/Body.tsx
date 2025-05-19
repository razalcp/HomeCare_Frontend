import { Clock, Users, BadgeDollarSign, Timer, Stethoscope, MessageSquare, Video, Search, Building2, UserPlus, Share2, UserCircle } from 'lucide-react'
import HomePageBanner from 'src/assets/HomePageBanner.jpg'
import { Card, CardContent } from './Card'

import DocBanner3 from 'src/assets/HomeBanner2.png'
import HomeBanner3 from 'src/assets/HomeBanner3.jpg'
import { Service, Feature, FeatureProps } from 'src/interfaces/userInterfaces/userInterfaces'
import Button from './button'

const Feature = ({ icon, title, description, bgColor }: FeatureProps) => (
    <div className="flex items-start gap-4">
        <div className={`${bgColor} p-3 rounded-xl`}>
            {icon}
        </div>
        <div className="space-y-1">
            <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    </div>
);


const features: Feature[] = [
    {
        icon: <Clock className="w-5 h-5 text-blue-600" />,
        title: "24/7 Expert Experience",
        description: "Access to medical experts around the clock"
    },
    {
        icon: <Users className="w-5 h-5 text-blue-600" />,
        title: "24/7 Service Available",
        description: "Healthcare services available whenever you need them"
    },
    {
        icon: <BadgeDollarSign className="w-5 h-5 text-blue-600" />,
        title: "Fair Pricing, Best Result",
        description: "Quality healthcare at reasonable prices"
    },
    {
        icon: <Stethoscope className="w-5 h-5 text-blue-600" />,
        title: "Professional Medical Service",
        description: "Expert care from qualified medical professionals"
    }
]

const services: Service[] = [
    {
        icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
        title: "Free Chat With Doctors",
        description: "Get quick medical advice through our chat service"
    },
    {
        icon: <Video className="w-6 h-6 text-blue-600" />,
        title: "Video Consult",
        description: "Face-to-face consultations from your home"
    },
    {
        icon: <Search className="w-6 h-6 text-blue-600" />,
        title: "Search Doctors",
        description: "Find the right specialist for your needs"
    },
    {
        icon: <Building2 className="w-6 h-6 text-blue-600" />,
        title: "Search Hospital",
        description: "Locate nearby healthcare facilities"
    },
    {
        icon: <UserPlus className="w-6 h-6 text-blue-600" />,
        title: "Friendly Doctors",
        description: "Compassionate care from understanding professionals"
    },
    {
        icon: <Share2 className="w-6 h-6 text-blue-600" />,
        title: "Share Your Difficulties",
        description: "Open discussion about your health concerns"
    }
]

const Body = () => {
    return (
        <main className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="w-full grid lg:grid-cols-2 gap-8 items-center py-12 md:py-20 bg-customBlue">
                <div className="space-y-6">
                    <h3 className="ml-28 text-green-600">Welcome to HomeCare👏</h3>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ml-28">
                        Simplified healthcare for everybody
                    </h1>
                    <p className="text-gray-600 text-lg ml-28">
                        Getting healthcare is a right not a privilege. It has the real value of your health and you deserve nothing but the best care.
                    </p>
                    <div >
                        <Button size="lg" className="rounded-md ml-28">
                            Request Appointment
                        </Button>
                    </div>

                </div>
                <div className="relative h-[400px]">
                    <img
                        src={HomePageBanner}
                        alt="Healthcare Professional"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
            </section>

            {/* Features Section */}
            <section className="relative min-h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${DocBanner3})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />

                {/* Content Container */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-white">
                    {/* Top Text */}
                    <p className="mb-16 text-center text-lg">
                        Our doctors specialize in complex health issues ignored by conventional medicine
                    </p>

                    {/* Main Content Grid */}
                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                        {/* Left Column - Service Features */}
                        <div className="p-8 flex items-center justify-center">
                            <div className="backdrop-blur-xl bg-white/30 p-8 rounded-3xl">
                                <div className="bg-white rounded-3xl p-8 text-gray-800">
                                    <div className="space-y-8">
                                        <Feature
                                            icon={<UserCircle className="w-8 h-8 text-purple-400" />}
                                            title="25+ Years Experience"
                                            description="For over 25 years, we have been dedicated to providing top-tier medical services, ensuring the highest standards of patient care and innovation"
                                            bgColor="bg-purple-100"
                                        />

                                        {/* Grey Separator */}
                                        <div className="border-t border-gray-300" />

                                        <Feature
                                            icon={<Clock className="w-8 h-8 text-cyan-400" />}
                                            title="24/7 Service Available"
                                            description="Our medical team is available round the clock to provide immediate care and support whenever you need it"
                                            bgColor="bg-cyan-100"
                                        />

                                        <div className="border-t border-gray-300" />

                                        <Feature
                                            icon={<Timer className="w-8 h-8 text-amber-400" />}
                                            title="Fast Process, Best Results"
                                            description="We combine efficient processes with exceptional medical expertise to deliver optimal healthcare outcomes"
                                            bgColor="bg-amber-100"
                                        />

                                        <div className="border-t border-gray-300" />

                                        <Feature
                                            icon={<Stethoscope className="w-8 h-8 text-blue-400" />}
                                            title="Professional Medical Services"
                                            description="Our team of qualified healthcare professionals delivers comprehensive medical services with dedication and expertise"
                                            bgColor="bg-blue-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* Right Column - Statistics */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl font-bold mb-4">
                                    Here's what makes us different from Others
                                </h2>
                                <p className="text-lg opacity-90">
                                    We are brave compared to others because we believe that what we have is the best
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-5xl font-bold mb-2">3000+</div>
                                    <p className="text-lg">
                                        Patients served every day
                                    </p>
                                </div>
                                <div>
                                    <div className="text-5xl font-bold mb-2">200K</div>
                                    <p className="text-lg">
                                        Medical Team around the world
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3rd banner section */}
            <section className="relative min-h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${HomeBanner3})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Centered Content */}
                <div className="relative z-10 flex items-center justify-center min-h-screen text-center px-4">
                    <div>
                        {/* Square Yellow Banner Above Heading */}
                        <div className="bg-[#F5E6A6] px-6 py-3 rounded-none shadow-lg mb-6 inline-block">
                            <p className="text-sm font-medium">
                                We thrive where conventional medicine is ignored
                            </p>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Root Cause Medicine
                        </h2>
                        <p className="max-w-2xl text-white/90 text-lg mb-8">
                            Wisdom doctors go beyond surface-level appointments and help you treat the
                            root cause of your health issues so you don't have to keep dealing with
                            symptoms.
                        </p>
                        <button className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 rounded-md transition-colors duration-300">
                            Learn more
                            <svg
                                className="ml-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>




            {/* Services Grid */}
            <section className="container py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Quality health made with homecare simple</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Access quality healthcare services from the comfort of your home
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <Card key={index} className="text-center">
                            <CardContent>
                                <div className="inline-flex p-3 rounded-lg bg-blue-50 mb-4">
                                    {service.icon}
                                </div>
                                <h3 className="font-semibold mb-2">{service.title}</h3>
                                <p className="text-sm text-gray-600">{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Body