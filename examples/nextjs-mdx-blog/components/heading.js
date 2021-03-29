import React from 'react';

import { Heading } from '@chakra-ui/react';

export function H1({ children, id, className }) {
  return (
    <Heading as="h1" size="2xl" className={className} id={id}>{children}</Heading>
  );
}

export function H2({ children, id, className }) {
  return (
    <Heading as="h2" size="xl" className={className} id={id}>{children}</Heading>
  );
}

export function H3({ children, id, className }) {
  return (
    <Heading as="h3" size="lg" className={className} id={id}>{children}</Heading>
  );
}

export function H4({ children, id, className }) {
  return (
    <Heading as="h4" size="md" className={className} id={id}>{children}</Heading>
  );
}

export function H5({ children, id, className }) {
  return (
    <Heading as="h5" size="sm" className={className} id={id}>{children}</Heading>
  );
}

export function H6({ children, id, className }) {
  return (
    <Heading as="h6" size="xs" className={className} id={id}>{children}</Heading>
  );
}
