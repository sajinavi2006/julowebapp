interface Props {
  errorMessage: string;
  hyperlink: string;
}

const HyperlinkMessage = ({
  errorMessage,
  hyperlink = 'https://play.google.com/store/apps/details?id=com.julofinance.juloapp',
}: Props) => {
  return errorMessage.split('\n').map((str, key) => (
    <div key={key}>
      {/* It will be searching https text an changing to hyperlink */}
      {str.match(/https/gi) ? (
        <p>
          {str.replace(hyperlink, '')}
          <a href={hyperlink} rel='noreferrer' target='_blank'>
            sini
          </a>
        </p>
      ) : (
        <p>{str}</p>
      )}
    </div>
  ));
};

export default HyperlinkMessage;
