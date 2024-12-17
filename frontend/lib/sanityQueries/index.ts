export const mediaString = `
	...,
	mediaType,
	image {
		asset-> {
			url,
			metadata {
				lqip
			}
		},
		alt
	},
	video {
		asset-> {
			playbackId,
		},
	},
`;

export const siteSettingsQueryString = `
*[_type == "siteSettings"][0] {
	...,
}`;

export const homePageQueryString = `
	*[_type == "homePage"][0] {
			...,
			seo,
			heroMedia {
				${mediaString}
			},
			featuredWork[]->{
					...
			},
			studioSection {
					...,
					studioMedia {
						${mediaString}
					}
			}
	}
`;

export const workPageQueryString = `
	*[_type == "workPage"][0] {
		...,
	}
`;

export const pressPageQueryString = `
	*[_type == "pressPage"][0] {
		...,
		pressCards[] {
			title,
			link,
			colour {
				hex
			},
			image {
				asset-> {
					url
				}
			}
		}
	}
`;

export const contactPageQueryString = `
	*[_type == "contactPage"][0] {
		...,
	}
`;

export const sensitivePageQueryString = `
	*[_type == "sensitivePage"][0] {
		...,
	}
`;

const workListString = `
	...,
	landscapeThumbnailImage {
			asset->{
					url,
					alt
			}
	},
	portraitThumbnailImage {
			asset->{
					url,
					alt
			}
	},
	sketches[] {
			asset->{
					url,
					alt
			}
	},
	credits[] {
			...
	},
	pageBuilder[] {
			component,
			fullMedia {
				title,
				aspectRatio,
				media {
					${mediaString}
				}
			},
			isolatedMedia {
					aspectRatio,
					media {
						${mediaString}
					}
			},
			multiColumnMedia {
					aspectRatio,
					columns[] {
							${mediaString}
					}
			}
	},
	senseBlocks[]{
			...,
			image {
				asset->{
					url,
					alt
				}
			}
	},
	relatedWork[]->{
		slug,
		title,
		portraitThumbnailImage {
			asset->{
					url,
					alt
			}
		},
	}
`;

export const publicWorkQueryString = `
    *[_type == "publicWork"] | order(orderRank) [0...100] {
			${workListString}
    }
`;

export const privateWorkQueryString = `
    *[_type == "privateWork"] | order(orderRank) [0...100] {
			${workListString}
    }
`;
