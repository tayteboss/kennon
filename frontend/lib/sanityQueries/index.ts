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
	privateWorkImage {
		asset-> {
			url
		}
	},
	publicWorkImage {
		asset-> {
			url
		}
	},
	showreel {
		asset-> {
			playbackId
		}
	}
}`;

export const homePageQueryString = `
	*[_type == "homePage"][0] {
			...,
			seo,
			heroMedia {
				${mediaString}
			},
			featuredWork[]->{
					_type,
					slug,
					landscapeThumbnailImage {
						asset->{
							...,
							url,
							alt
						}
					},
					location,
					title,
					yearCompleted
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
		media {
			${mediaString}
		}
	}
`;

export const studioPageQueryString = `
	*[_type == "studioPage"][0] {
		...,
		referenceTitle,
		seo,
		heroTitle,
		heroMedia {
			${mediaString}
		},
		studioSection {
			...,
			subheading,
			heading,
			sectorExperience[] {
				...,
			},
			associations[] {
				...,
			},
			awards[] {
				year,
				awardTitle
			}
		},
		beingSensitiveSection {
			...,
			subheading,
			heading,
			media {
				${mediaString}
			}
		},
		teamSection {
			...,
			subheading,
			heading,
			media {
				${mediaString}
			}
		},
		pressSection {
			...,
			subheading,
			heading
		}
	}
`;

export const sensitivePageQueryString = `
	*[_type == "sensitivePage"][0] {
		...,
		media {
			${mediaString}
		}
	}
`;

export const workListString = `
	...,
	comingSoon,
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
