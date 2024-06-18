import { HiMail, HiLocationMarker } from 'react-icons/hi';
import CopyToClipboard from '../CopyToClipboard';

const ContactsInfo = () => (
  <>
    <div className="inline-flex space-x-2 items-center">
      <span className="text-red-400 text-xl">
        <HiMail size={24} />
      </span>
      <CopyToClipboard text="eventsbysaga@gmail.com" />
    </div>

    <div className="inline-flex space-x-2 items-center">
      <span className="text-red-400 text-xl">
        <HiLocationMarker size={24} />
      </span>
      <CopyToClipboard text="Klaipeda LT" />
    </div>
  </>
);

export default ContactsInfo;
