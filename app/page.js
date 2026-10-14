import Preloader from '@/components/Preloader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Offer from '@/components/Offer';
import Reasons from '@/components/Reasons';
import Projects from '@/components/Projects';
import Heads from '@/components/Heads';
import Stack from '@/components/Stack';
import Services from '@/components/Services';
import Chess from '@/components/Chess';
import Form from '@/components/Form';
import Footer, { Faq } from '@/components/Footer';
import Cursor from '@/components/Cursor';
import TransitionLayer from '@/components/TransitionLayer';
import Motion from '@/components/Motion';

export default function Home() {
  return (
    <div className="page-wrapper">
      <Preloader />
      <Nav />
      <main id="main">
        <Hero />
        <Offer />
        <Reasons />
        <Projects />
        <Heads />
        <Stack />
        <Services />
        <Faq />
        <Chess />
        <Form />
      </main>
      <Footer />
      <TransitionLayer />
      <Cursor />
      <Motion />
    </div>
  );
}
