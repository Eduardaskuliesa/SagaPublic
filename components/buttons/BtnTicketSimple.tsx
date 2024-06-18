import useCursorHandlers from '@/hooks/useCursorsHandlers';
import MagneticButtonWrapper from './MagneticButtonWrapper';

type Props = {
  ticket: string
  addClass?: string,
};

const BtnTicketSimple = ({ ticket, addClass }: Props) => {
  const { onMouseEnter, onMouseLeave } = useCursorHandlers();
  return (
    <MagneticButtonWrapper>
      <a
        onMouseEnter={(e) => onMouseEnter(e, 'dot')}
        onMouseLeave={(e) => onMouseLeave(e, 'dot')}
        href={ticket}
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-transparent sm:mr-5 mr-0 mt-2 hover:bg-red-400 text-red-400 font-semibold text-sm  md:text-base hover:text-white py-1 px-2 md:py-2 md:px-4 border border-red-400 hover:border-transparent duration-300 rounded ${addClass}`}
      >
        Pirkti bileta
      </a>
    </MagneticButtonWrapper>
  );
};

export default BtnTicketSimple;
