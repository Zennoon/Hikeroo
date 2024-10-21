'use client'

import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import {
  FaHiking,
  FaUsers,
  FaComments,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaEnvelope
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Feature = ({ icon, title, description, inView, delay }) => {
  return (
    <div
      className={`transition-transform duration-1000 delay-${delay} transform ${
        inView ? 'translate-x-0 opacity-100' : 'translate-x-[-100%] opacity-0'
      } flex flex-col gap-y-3 items-center text-center`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-6xl text-green-600 mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const HikeImage = ({ src, inView, delay }) => {
  return (
    <div
      className={`transition-transform duration-1000 delay-${delay} transform ${
        inView ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img src={ src } alt="An image of a hike" className='w-auto h-64 shadow-xl rounded-md' />
    </div>
  )
}

const LandingPage = () => {
  const [ref1, inView1] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0.5 });
  const [ref3, inView3] = useInView({ threshold: 0.5 });
  return (
    <div className="w-full h-full">
      <Parallax pages={5}>
        {/* Parallax Layer 1: Hero Section */}
        <ParallaxLayer offset={0} speed={0.5}>
          <section className="h-screen bg-green-700 flex items-center justify-center text-white">
            <div className="text-center space-y-6">
              <h1 className="text-5xl font-bold">Welcome to Hikeroo</h1>
              <p className="text-xl">Join hikes, make friends, and explore nature together</p>
              <div className="flex justify-center gap-x-3">
                <Button className="mt-4 px-6 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-300" asChild>
                  <Link href='/auth/register'>Get Started</Link>
                </Button>
                <Button className="mt-4 px-6 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-300" asChild>
                  <Link href='/auth/login'>Sign In</Link>
                </Button>
              </div>
            </div>
          </section>
        </ParallaxLayer>

        {/* Parallax Layer 2: Features Section */}
        <ParallaxLayer offset={1} speed={0.5}>
          <section ref={ref1} className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
            <h2 className="text-4xl font-bold mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8">
              <Feature
                icon={<FaHiking />}
                title="Create or Join Hikes"
                description="Find the perfect hiking group or start your own adventure."
                inView={inView1}
                delay='700'
              />
              <Feature
                icon={<FaUsers />}
                title="Connect with Friends"
                description="Send friend requests and invite friends to your hikes."
                inView={inView1}
                delay='500'
              />
              <Feature
                icon={<FaComments />}
                title="Chat with Members"
                description="Plan your hike and communicate with other members in real-time."
                inView={inView1}
                delay='200'
              />
            </div>
          </section>
        </ParallaxLayer>

        {/* Parallax Layer 3: Sample images */}
        <ParallaxLayer offset={2} speed={0.5}>
        <section ref={ref2} className="h-screen w-full bg-green-800 flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-bold mb-4">Explore Earth's wonders</h2>
            <p className="mb-8">Get to know our planet's magic with fellow adventurers.</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8">
              <HikeImage
                inView={inView2}
                delay='200'
                src='/images/hike_img1.jpg'
              />
              <HikeImage
                inView={inView2}
                delay='500'
                src='/images/hike_img2.jpg'
              />
              <HikeImage
                inView={inView2}
                delay='700'
                src='/images/hike_img3.jpg'
              />
              <HikeImage
                inView={inView2}
                delay='1000'
                src='/images/hike_img4.jpg'
              />
            </div>
          </section>
        </ParallaxLayer>
        {/* Parallax Layer 4: Call to Action */}
        <ParallaxLayer offset={3} speed={0.5}>
          <section className="h-screen flex flex-col items-center justify-center text-green-600">
            <h2 className="text-4xl font-bold mb-4">Start Your Adventure Today</h2>
            <p className="mb-8">Join Hikeroo and meet fellow hiking enthusiasts.</p>
            <Button className="px-10 py-6 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-500">
              <Link href='/auth/register' className='font-semibold'>Sign Up Now</Link>
            </Button>
          </section>
        </ParallaxLayer>

        {/* Parallax Layer 5: Contact us */}
        <ParallaxLayer sticky={{ start: 3.7, end: 4 }} speed={0.5}>
          <footer ref={ ref3 } className="bg-white text-gray-700 py-8 border-t border-gray-300">
            <div className={`container mx-auto text-center transition-transform duration-1000 transform ${
              inView3 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
              <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
              <ul className="flex justify-center space-x-6 mb-4">
                <li>
                  <a href="mailto:yunus24kedir@gmail.com" className="text-gray-700 hover:text-green-600">
                    <FaEnvelope className="inline-block w-6 h-6 mr-2" /> Email
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Zennoon" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-600">
                    <FaGithub className="inline-block w-6 h-6 mr-2" /> GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/ZennoonK" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-600">
                    <FaTwitter className="inline-block w-6 h-6 mr-2" /> Twitter
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/yunus_kedir" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-600">
                    <FaLinkedin className="inline-block w-6 h-6 mr-2" /> LinkedIn
                  </a>
                </li>
              </ul>
              <p className="text-sm text-gray-500">&copy; 2024 Hikeroo. All rights reserved.</p>
            </div>
          </footer>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default LandingPage;
