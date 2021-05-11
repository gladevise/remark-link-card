import { css } from '@emotion/react';
import customTheme from '@/styles/theme';

const rlcStyle = css`
.rlc-container {
  && {
    width: 100%;
    max-width: ${customTheme.sizes.container.md};
    max-height: ${customTheme.sizes.md};
    margin: 0 auto 2rem;

    color: ${customTheme.colors.gray['900']};
    text-decoration: none;

    border-radius: ${customTheme.radii.md};
    box-shadow: ${customTheme.shadows.md};

    display: flex;
    align-items: stretch;

    transition: box-shadow 200ms ease-in-out 0s;
  }

  &&:hover {
    color: ${customTheme.colors.gray['900']};
    box-shadow: ${customTheme.shadows.xl};
    text-decoration: none;
  }
}

.rlc-info {
  overflow: hidden;
  padding: 0.5rem;
  flex: 4 1 100px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.rlc-title {
  font-size: ${customTheme.fontSizes.xl};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rlc-description {
  font-size: ${customTheme.fontSizes.sm};
  color: ${customTheme.colors.gray['700']};
  overflow: hidden;
  line-height:1rem;
  height: 2rem;
}

.rlc-url-container {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rlc-favicon {
  width: 16px;
  height: 16px;
}

.rlc-url {
  font-size: ${customTheme.fontSizes.md};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.rlc-image-container {
  position: relative;
  flex: 1 1 150px;
}

.rlc-image {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-bottom-right-radius:${customTheme.radii.md};
  border-top-right-radius: ${customTheme.radii.md};
}
`

export default rlcStyle