import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

export default function CustomLink({ children, href, className }) {
  // isIdLink
  // #で始まるリンクをnext/linkに入れると、パスが解決できず、
  // [slug]#foo のような文字列が挿入されてしまう
  // ex: href="/[slug]#inline-link"
  const isIdLink = href && (href.startsWith('#'));
  if (isIdLink) {
    return (
      <StyledLink href={href} className={className}>{children}</StyledLink>
    );
  }
  // use next/link for internal links
  const isInternalLink = href && (href.startsWith('/'));
  return (
    <NextLink href={href} passHref>
      <StyledLink isExternal={!isInternalLink} className={className}>
        {children}
      </StyledLink>
    </NextLink>
  );
}
CustomLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};

const StyledLink = ({ href, children, isExternal, className }) => (
  <Link
    className={className}
    _hover={{ color: 'primary.500', textDecoration: 'underline' }}
    href={href}
    isExternal={isExternal}
  >
    {children}
  </Link>
);
StyledLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  isExternal: PropTypes.bool,
  className: PropTypes.string,
};
