import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    imageWithCaption: {
      render: component('./src/components/markdoc/ImageWithCaption.astro'),
      attributes: {
        image: { type: String },
        caption: { type: String },
        size: { type: String },
        align: { type: String },
      },
    },
  },
});
