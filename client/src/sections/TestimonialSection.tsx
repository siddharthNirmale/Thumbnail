import SectionTitle from "../components/SectionTitle";
import TestimonialCard from "../components/TestimonialCard";
import { testimonialsData } from "../data/testimonial";
import type { ITestimonial } from "../types";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

export default function TestimonialSection() {
  const animatedCards = (direction: "left" | "right") => (
    <Marquee
      className="max-w-5xl mx-auto my-6"
      gradient={true}
      speed={35}
      direction={direction}
      gradientColor={[0, 0, 0]}
    >
      <div className="flex items-center justify-center py-5 overflow-hidden gap-6">
        {[...testimonialsData, ...testimonialsData].map((testimonial: ITestimonial, index: number) => (
          <motion.div
            key={index}
            className="flex-shrink-0"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <TestimonialCard index={index} testimonial={testimonial} />
          </motion.div>
        ))}
      </div>
    </Marquee>
  );

  return (
    <div id="testimonials" className="px-4 md:px-16 lg:px-24 xl:px-32">
      <SectionTitle
        text1="Testimonials"
        text2="Loved by creators"
        text3="We're proud of our community of creators who trust us to help them grow their audience."
      />

      {animatedCards("left")}
      {animatedCards("right")}
    </div>
  );
}
