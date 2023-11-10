import React from 'react'
import { AiFillAmazonCircle } from 'react-icons/ai'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import Tilt from "react-parallax-tilt";
import { color, motion } from "framer-motion";
import moble1 from "../../assets/mobile1.png";

const MidSection = () => {
  return (
    <div className="flex sm:flex-row flex-col w-[90vw]  m-auto justify-between items-center">
        <motion.div whileHover={{ scale: 1.2 }}>
          <Tilt>
            <img className="sm:w-[30vw] " src={moble1} alt="" />
          </Tilt>
        </motion.div>
        <h1 className="">
          <VerticalTimeline>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(33, 150, 243)",
              }}
              date="2011 - present"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<AiFillAmazonCircle />}
            >
              <h3 className="vertical-timeline-element-title">Download App</h3>

              <p>
                Download our app and unlock a world of secure communication at
                your fingertips.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2010 - 2011"
              contentStyle={{
                background: `rgb(233, 30, 99)`,
                color: ` rgb(255, 255, 255)`,
              }}
              iconStyle={{
                background: `rgb(233, 30, 99)`,
                color: ` rgb(255, 255, 255)`,
              }}
              icon={<AiFillAmazonCircle />}
            >
              <h3 className="vertical-timeline-element-title">
                Choose Payment
              </h3>

              <p>
                Selecting the perfect payment option has never been easier. With
                our encrypted chat/messaging application.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2008 - 2010"
              contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<AiFillAmazonCircle />}
            >
              <h3 className="vertical-timeline-element-title">Make Payment</h3>

              <p>
                Seamlessly and securely complete your transactions with ease.
                Our trusted payment process ensures that your information is
                protected
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2006 - 2008"
              contentStyle={{
                background: `rgb(233, 30, 99)`,
                color: ` rgb(255, 255, 255)`,
              }}
              iconStyle={{
                background: `rgb(233, 30, 99)`,
                color: ` rgb(255, 255, 255)`,
              }}
              icon={<AiFillAmazonCircle />}
            >
              <h3 className="vertical-timeline-element-title">Register</h3>

              <p>
                Register now to experience the ultimate privacy and protection
                in your messaging.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="April 2013"
              contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<AiFillAmazonCircle />}
            >
              <h3 className="vertical-timeline-element-title">
                Get Amazing Services
              </h3>

              <p>
                Unlock a world of amazing services and experience a new level of
                convenience, quality, and satisfaction.
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </h1>
      </div>
  )
}

export default MidSection