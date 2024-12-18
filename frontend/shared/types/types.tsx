export type MediaType = {
  mediaType: "video" | "image";
  video: { asset: { playbackId: string } };
  image: { asset: { url: string; metadata: { lqip: string } }; alt: string };
};

export type TransitionsType = {
  hidden: {
    opacity: number;
    transition: {
      duration: number;
    };
  };
  visible: {
    opacity: number;
    transition: {
      duration: number;
      delay?: number;
    };
  };
};

export type ButtonType = {
  url: string;
  pageReference: {
    _ref: string;
  };
  title: string;
};

export type SlugType = {
  current: string;
};

export type SiteSettingsType = {
  referenceTitle: string;
  email: string;
  phone: string;
  address: string;
  googleMapsLink: string;
  aoc: string;
  instagramUrl: string;
  showreel: {
    asset: {
      playbackId: string;
    };
  };
  footerTagline: string;
  estYear: number;
  privateWorkImage: {
    asset: {
      url: string;
    };
  };
  publicWorkImage: {
    asset: {
      url: string;
    };
  };
};

export type SEOType = {
  title: string;
  description: string;
};

export type HomePageType = {
  referenceTitle: string;
  seo: SEOType;
  heroMedia: MediaType;
  featuredWork: WorkType[];
  studioSection: {
    studioSubheading: string;
    studioHeading: string;
    studioMedia: MediaType;
  };
};

export type WorkPageType = {
  seo: SEOType;
  heroTitle: string;
};

export type PressPageType = {
  seo: SEOType;
  heroTitle: string;
};

export type SensitivePageType = {
  seo: SEOType;
  heroTitle: string;
  media: MediaType;
};

export type ContactPageType = {
  seo: SEOType;
  heroTitle: string;
  media: MediaType;
};

export type CreditsType = {
  name: string;
  title: string;
  link?: string;
};

export type SenseBlockType = {
  title: string;
  description: string;
  image: {
    asset: {
      url: string;
      alt: string;
    };
  };
};

export type FullMediaType = {
  title: string;
  aspectRatio: string;
  media: {
    mediaType: string;
    image?: {
      asset: {
        url: string;
        metadata: {
          lqip: string;
        };
      };
      alt: string;
    };
    video?: {
      asset: {
        playbackId: string;
      };
    };
  };
};

export type IsolatedMediaType = {
  aspectRatio: string;
  media: {
    mediaType: string;
    image?: {
      asset: {
        url: string;
        metadata: {
          lqip: string;
        };
      };
      alt: string;
    };
    video?: {
      asset: {
        playbackId: string;
      };
    };
  };
};

export type MultiColumnMediaType = {
  aspectRatio: string;
  columns: Array<{
    media: {
      mediaType: string;
      image?: {
        asset: {
          url: string;
          metadata: {
            lqip: string;
          };
        };
        alt: string;
      };
      video?: {
        asset: {
          playbackId: string;
        };
      };
    };
  }>;
};

export type WorkType = {
  _type: "publicWork" | "privateWork";
  slug: SlugType;
  title: string;
  landscapeThumbnailImage: {
    asset: {
      url: string;
      alt: string;
    };
  };
  location: string;
  yearCompleted: string;
  portraitThumbnailImage: {
    asset: {
      url: string;
      alt: string;
    };
  };
  sketches: Array<{
    asset: {
      url: string;
      alt: string;
    };
  }>;
  credits: CreditsType[];
  pageBuilder: Array<{
    component: string;
    fullMedia?: FullMediaType;
    isolatedMedia?: IsolatedMediaType;
    multiColumnMedia?: MultiColumnMediaType;
  }>;
  senseBlocks: SenseBlockType[];
  relatedWork: Array<{
    slug: SlugType;
    title: string;
    portraitThumbnailImage: {
      asset: {
        url: string;
        alt: string;
      };
    };
  }>;
};
