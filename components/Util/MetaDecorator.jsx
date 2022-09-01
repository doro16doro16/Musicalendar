import React from "react";
import PropTypes from "prop-types";

const MetaDecorator = ({ title, description, imageUrl, imageAlt, domain }) => {
  return (
    <>
      <title>{title}</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={domain} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta property="twitter:url" content={domain} />
    </>
  );
};

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imagrUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
};
export default MetaDecorator;
