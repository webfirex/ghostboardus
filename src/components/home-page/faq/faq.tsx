import { Title, Container, Accordion, ThemeIcon, rem, Badge } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classes from './FaqWithBg.module.css';

const placeholder =
  'Explore our extensive Help Center, which includes FAQs, tutorials, and guides. Find answers to common questions and step-by-step instructions to navigate our platform with ease.';

export function FaqAccordion() {

  return (
    <Accordion
      chevronPosition="right"
      defaultValue="reset-password"
      chevronSize={26}
      className=' z-10'
      w={'100%'}
      chevron={
        <ThemeIcon radius="xl" className={classes.gradient + ' cursorX border'} size={26}>
          <IconPlus color='#000' style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ThemeIcon>
      }
    >
      <Accordion.Item className={classes.item} value="about-ghostboard">
        <Accordion.Control className={classes.control}>
          <p className='font-semibold'>What is Ghostboard, and how does it help traders?</p>
        </Accordion.Control>
        <Accordion.Panel className={classes.content}>
          Ghostboard is an advanced AI-powered trading analytics platform that provides institutional-grade tools and insights to empower traders with actionable data, helping them make informed decisions.
        </Accordion.Panel>
      </Accordion.Item>
          
      <Accordion.Item className={classes.item} value="free-trial">
        <Accordion.Control className={classes.control}>
          <p className='font-semibold'>Do you offer a free trial before subscribing?</p>
        </Accordion.Control>
        <Accordion.Panel className={classes.content}>
          Yes, we offer a 7-day free trial for new users to explore all our features before committing to a subscription.
        </Accordion.Panel>
      </Accordion.Item>
          
      <Accordion.Item className={classes.item} value="beginners">
        <Accordion.Control className={classes.control}>
          <p className='font-semibold'>Can beginners use Ghostboard, or is it only for professionals?</p>
        </Accordion.Control>
        <Accordion.Panel className={classes.content}>
          Ghostboard is designed for traders of all levels. Whether you’re a beginner or a pro, our modules and tools are easy to use and highly effective.
        </Accordion.Panel>
      </Accordion.Item>
          
      <Accordion.Item className={classes.item} value="payment-methods">
        <Accordion.Control className={classes.control}>
          <p className='font-semibold'>What payment methods do you accept?</p>
        </Accordion.Control>
        <Accordion.Panel className={classes.content}>
          We securely process all payments via Stripe, accepting major credit and debit cards.
        </Accordion.Panel>
      </Accordion.Item>
          
      <Accordion.Item className={classes.item} value="data-security">
        <Accordion.Control className={classes.control}>
          <p className='font-semibold'>Is my personal and payment information secure?</p>
        </Accordion.Control>
        <Accordion.Panel className={classes.content}>
          Absolutely. We prioritize your privacy and security by using encryption and trusted payment gateways to keep your data safe.
        </Accordion.Panel>
      </Accordion.Item>
          
      <Accordion.Item className={classes.item} value="refund-policy">
        <Accordion.Control className={classes.control}>
          <p className='font-semibold'>Do you offer refunds if I cancel my subscription?</p>
        </Accordion.Control>
        <Accordion.Panel className={classes.content}>
          We do not offer refunds under any circumstances. However, you can cancel anytime, and access will continue until the current billing cycle ends.
        </Accordion.Panel>
      </Accordion.Item>
          
      <Accordion.Item className={classes.item} value="support">
        <Accordion.Control className={classes.control}>
          <p className='font-semibold'>How can I get additional support if needed?</p>
        </Accordion.Control>
        <Accordion.Panel className={classes.content}>
          You can reach out to our support team anytime via email at support@ghostboard.net. We’re here to help!
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}