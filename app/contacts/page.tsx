import React from 'react';
import { Metadata } from 'next';
import ConactForm from '@/components/contacts/ConactForm';
import BlobSvg from '@/components/svgs/BlobSvg';
import ContactsInfo from '@/components/contacts/ContactsInfo';
import FormIcons from '@/components/contacts/FormIcons';

export const metadata: Metadata = {
  title: 'Kontaktai | Saga Plans',
  description: 'Geriausi eventai pajūryje!',
};

export const dynamic = 'force-static';

const ContactUs = () => (

  <main className="font-mono flex w-full min-h-screen justify-center items-center mb-5">
    <div className="simple-background" />
    <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-0
      space-y-6 bg-red-900 w-full max-w-6xl p-8 rounded-xl shadow-lg text-white overflow-hidden sm:mx-5"
    >
      <div className="flex flex-col space-y-8 justify-between">
        <div>
          <h1 className="font-bold text-4xl tracking-wide">Contact Us</h1>
          <p className="pt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, voluptatem?</p>
        </div>
        <div className="flex flex-col space-y-6 ">
          <ContactsInfo />
        </div>
        <FormIcons />
      </div>
      <div className="relative">

        <div className="absolute z-0 w-96 h-96 -right-64 -top-36">
          <BlobSvg blobVariant={5} />
        </div>
        <div className="absolute z-0 w-96 h-96 right-44 -bottom-64">
          <BlobSvg blobVariant={4} />
        </div>
        <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 text-gray-600 md:w-100">
          <ConactForm />
          {' '}
        </div>
      </div>
    </div>
  </main>
);

export default ContactUs;
