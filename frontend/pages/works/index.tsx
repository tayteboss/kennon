import styled from "styled-components";
import client from "../../client";
import { AnimatePresence, motion } from "framer-motion";
import {
  TransitionsType,
  WorkPageType,
  WorkType,
} from "../../shared/types/types";
import { NextSeo } from "next-seo";
import {
  multiResWorkQueryString,
  privateWorkQueryString,
  publicWorkQueryString,
  workPageQueryString,
} from "../../lib/sanityQueries";
import pxToRem from "../../utils/pxToRem";
import { useEffect, useState } from "react";
import HeroTitle from "../../components/blocks/HeroTitle";
import LandscapeWorksList from "../../components/blocks/LandscapeWorksList";
import PortraitWorksList from "../../components/blocks/PortraitWorksList";
import ListWorksList from "../../components/blocks/ListWorksList";
import WorkViewToolbar from "../../components/elements/WorkViewToolbar";
import { useLenis } from "@studio-freight/react-lenis";
import { useRouter } from "next/router";
import WorksHeroTitle from "../../components/blocks/WorksHeroTitle";

const PageWrapper = styled(motion.div)`
  padding-top: var(--header-h);
  min-height: 150vh;
  padding-bottom: ${pxToRem(80)};
  background: var(--colour-white);
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

type Props = {
  data: WorkPageType;
  publicWorkList: WorkType[];
  privateWorkList: WorkType[];
  multiResWorkList: WorkType[];
  pageTransitionVariants: TransitionsType;
  cursorRefresh: any;
  checkWorkType: any;
};

const Page = (props: Props) => {
  const {
    data,
    publicWorkList,
    privateWorkList,
    multiResWorkList,
    pageTransitionVariants,
    cursorRefresh,
    checkWorkType,
  } = props;

  const [listView, setListView] = useState<"landscape" | "portrait" | "list">(
    "landscape"
  );
  const [workType, setWorkType] = useState<"private" | "public" | "multi">(
    "private"
  );
  const [workData, setWorkData] = useState<WorkType[]>(privateWorkList);

  const lenis = useLenis(({ scroll }) => {});

  const router = useRouter();

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { duration: 2, immediate: false });

    setTimeout(() => {
      cursorRefresh();
    }, 500);
  }, [listView, workType, lenis]);

  useEffect(() => {
    if (workType === "private") {
      setWorkData(privateWorkList);
    } else if (workType === "public") {
      setWorkData(publicWorkList);
    } else if (workType === "multi") {
      setWorkData(multiResWorkList);
    } else {
      setWorkData(privateWorkList);
    }
  }, [
    workType,
    privateWorkList,
    publicWorkList,
    multiResWorkList,
    router.query,
  ]);

  useEffect(() => {
    const sessionWorkType = sessionStorage.getItem("kennon-work-type");
    if (
      sessionWorkType === "private" ||
      sessionWorkType === "public" ||
      sessionWorkType === "multi"
    ) {
      setWorkType(sessionWorkType);
    }
  }, [checkWorkType, router.query]);

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title={data?.seo?.title || ""}
        description={data?.seo?.description || ""}
      />
      <WorksHeroTitle
        workType={workType}
        privateTitle={data?.privateResidencesTitle}
        publicTitle={data?.publicWorksTitle}
        multiTitle={data?.multiResidentialTitle}
      />
      <AnimatePresence mode="wait">
        {listView === "landscape" && (
          <LandscapeWorksList
            data={workData}
            wrapperVariants={wrapperVariants}
            key={`landscape-${workType}`}
          />
        )}
        {listView === "portrait" && (
          <PortraitWorksList
            data={workData}
            wrapperVariants={wrapperVariants}
            key={`portrait-${workType}`}
          />
        )}
        {listView === "list" && (
          <ListWorksList
            data={workData}
            wrapperVariants={wrapperVariants}
            key={`list-${workType}`}
          />
        )}
      </AnimatePresence>
      <WorkViewToolbar
        listView={listView}
        workType={workType}
        setListView={setListView}
        setWorkType={setWorkType}
      />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(workPageQueryString);
  let publicWorkList = await client.fetch(publicWorkQueryString);
  let privateWorkList = await client.fetch(privateWorkQueryString);
  let multiResWorkList = await client.fetch(multiResWorkQueryString);

  const extractImages = (item: any): any => {
    const allImages: string[] = [];

    // Landscape thumbnail
    if (item.landscapeThumbnailImage?.asset?.url) {
      allImages.push(item.landscapeThumbnailImage.asset.url);
    }

    // Portrait thumbnail
    if (item.portraitThumbnailImage?.asset?.url) {
      allImages.push(item.portraitThumbnailImage.asset.url);
    }

    // Loop through pageBuilder components
    if (Array.isArray(item.pageBuilder)) {
      for (const pb of item.pageBuilder) {
        // fullMedia images
        if (
          pb.fullMedia?.media?.image?.asset?.url &&
          !allImages.includes(pb.fullMedia.media.image.asset.url)
        ) {
          allImages.push(pb.fullMedia.media.image.asset.url);
        }

        // isolatedMedia images
        if (
          pb.isolatedMedia?.media?.image?.asset?.url &&
          !allImages.includes(pb.isolatedMedia.media.image.asset.url)
        ) {
          allImages.push(pb.isolatedMedia.media.image.asset.url);
        }

        // multiColumnMedia images
        if (Array.isArray(pb.multiColumnMedia?.columns)) {
          for (const col of pb.multiColumnMedia.columns) {
            if (
              col?.image?.asset?.url &&
              !allImages.includes(col.image.asset.url)
            ) {
              allImages.push(col.image.asset.url);
            }
          }
        }
      }
    }

    return {
      ...item,
      allImages: Array.from(new Set(allImages)),
    };
  };

  // Process public work list
  publicWorkList = publicWorkList.map((item: any) => extractImages(item));

  // Process private work list
  privateWorkList = privateWorkList.map((item: any) => extractImages(item));

  // Process multi res work list
  multiResWorkList = multiResWorkList.map((item: any) => extractImages(item));

  return {
    props: {
      data,
      publicWorkList,
      privateWorkList,
      multiResWorkList,
    },
  };
}

export default Page;
