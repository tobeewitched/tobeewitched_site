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
    callout: {
      render: component('./src/components/markdoc/Callout.astro'),
      attributes: {
        type: { type: String },
        text: { type: String },
      },
    },
    leadText: {
      render: component('./src/components/markdoc/LeadText.astro'),
      attributes: {
        text: { type: String },
      },
    },
    epigraph: {
      render: component('./src/components/markdoc/Epigraph.astro'),
      attributes: {
        text: { type: String },
        author: { type: String },
      },
    },
  },
});